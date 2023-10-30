import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MessageItem from './messageItem';

const ChatContainer = styled.div`
    width: 300px;
    height: 400px;
    border: 1px solid #ccc;
    padding: 10px;
    overflow-y: scroll;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const Input = styled.input`
    width: 80%;
    padding: 5px;
`;

const SendButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
`;

const Chat = () => {
    // 유저 라우터 사용
    const router = useRouter();
    // url 파라메터 값 추출함
    const { auctionno } = router.query;

    // 위로 보여질 메세지 설정
    const [messages, setMessages] = useState([]);
    // 새로운 메세지 설정
    const [newMessage, setNewMessage] = useState('');

    // SockJS 및 STOMP 클라이언트 설정 백 WebSocketConfig 의 Endpoint 설정과 일치해야함
    const socket = new SockJS('http://localhost:8081/ws'); // WebSocket 서버 URL
    const stompClient = Stomp.over(socket);

    useEffect(() => {
        //WebSocketConfig 의 /topic과 controller 의 /topic/receive/message/파라메터 로 지정된 @SendTo 와 일치해야 함
        const topic = `/topic/receive/HoGeMessage/${auctionno}`;

         // STOMP 연결시 콘솔 출력
         stompClient.connect({}, (frame) => {
            console.log('소켓 연결!:', frame);

            // 특정 토픽에 구독- 서브사이드 설정임 위쪽에 파라메터 값으로 채팅방 분리를 위해 const로 분리함
            stompClient.subscribe( topic, (message) => {
                const messageBody = JSON.parse(message.body);
                setMessages([...messages, messageBody]);
            });
        });       
 
        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => {
            if (stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [messages, stompClient]); // messages 와 stompClient의 변경이 있을 경우 즉시 useEffect 실행함
    
    // 새로운 채팅 입력시 시작되는 함수. NewMessage 에 Input value 값으로 설정함
    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    //엔터 치면 채팅 올라가게 되는 핸들러
    const handleKeyPress = (e)  => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // 엔터 이후나, 전송 버튼 클릭 시 실행함
    const handleSend = () => {
        if (newMessage) { // input value 에 값이 있으면 message에 전송자와 메세지 내용을 저장함
            const message = {
                sender: localStorage.getItem('name'), // 여기서 현재 사용자의 이름을 사용하거나 다른 식별 가능한 정보를 사용할 수 있습니다.
                text: newMessage,
            }; //stompClient 를 통해 send 함. WebSocketController 쪽 어노테이션 메세지 매핑과 맞아야 함
            stompClient.send(`/app/send/HoGeMessage/${auctionno}`, {}, JSON.stringify(message));
            setNewMessage(''); // 전송 후 nesMessage 를 초기화 함
        }
    };
    useEffect(() => { // 스크롤 설정 scrollTop 을 scrollHeight으로 지정해서 스크롤이 가장 아래로 세팅
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

   return (
        <div>
        <h1>GUEST</h1>
        <ChatContainer id="chat-container">
                {messages.map((message, index) => (
                    <MessageItem
                        key={index}
                        isMyMessage={message.sender === localStorage.getItem('name')} // 메시지가 현재 사용자의 것인지 확인
                        message={message.text}
                    />
                ))}
            </ChatContainer>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="바르고 고운말을 사용합시다"
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    onKeyPress={handleKeyPress}
                />
                <SendButton onClick={handleSend}>전송</SendButton>
            </InputContainer>
        </div>
    );
};

export default Chat;