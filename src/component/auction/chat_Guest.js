import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
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
            const socket = new SockJS('http://localhost:8081/ws');
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (frame) => {
                console.log('소켓 연결!:', frame);
                const messageTopic = `/topic/receive/HoGeMessage/${auctionno}`;
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
            return () => {
                if (stompClientRef.current && stompClientRef.current.connected) {
                    stompClientRef.current.disconnect();
                }
            };
        }
    }, [auctionno]);

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSend = () => {
        if (newMessage) {
            const message = {
                sender: localStorage.getItem('name'),
                text: newMessage,
            };
            stompClientRef.current.send(`/app/send/HoGeMessage/${auctionno}`, {}, JSON.stringify(message));
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    useEffect(() => {
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