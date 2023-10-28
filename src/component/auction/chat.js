import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef  } from 'react';
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

    const router = useRouter();
    const { auctionno } = router.query;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const stompClientRef = useRef(null);

    
    useEffect(() => {
        if (!stompClientRef.current) {

            // SockJS 및 STOMP 클라이언트 설정
            const socket = new SockJS('http://localhost:8081/ws'); // WebSocket 서버 URL
            const stompClient = Stomp.over(socket);

            // 웹소켓 연결 시도
            stompClient.connect({}, (frame) => {
                console.log('소켓 연결!:', frame);
    
                // 채팅 메시지 구독 로직
                const messageTopic = `/topic/receive/message/${auctionno}`;
                stompClient.subscribe(messageTopic, (message) => {
                    const messageBody = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, {
                        sender: messageBody.sender,
                        text: messageBody.text
                    }]);
                });
    
            }, (error) => {
                console.error("WebSocket connection error:", error);
            });
    
            stompClientRef.current = stompClient;
    
            // 컴포넌트 언마운트 시 웹소켓 연결 해제
            return () => {
                if (stompClientRef.current) {
                    stompClientRef.current.disconnect();
                }
            };
        }
    }, [auctionno]);

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };
    
    //엔터 치면 채팅 올라가게 되는 핸들러

    const handleSend = () => {
        if (newMessage) {
            const message = {
                sender: localStorage.getItem('name'), // 여기서 현재 사용자의 이름을 사용하거나 다른 식별 가능한 정보를 사용할 수 있습니다.
                text: newMessage,
            };
            stompClientRef.current.send(`/app/send/message/${auctionno}`, {}, JSON.stringify(message));
            setNewMessage('');
        }
    };
    const handleKeyPress = e => {
        if (e.key === 'Enter') handleSend();
    };

    useEffect(() => {
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    return (
        <div>
            <h1>경매 채팅창</h1>
            <ChatContainer id="chat-container">
                {messages.map((message, index) => (
                    <MessageItem
                        key={index}
                        sender={message.sender}
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