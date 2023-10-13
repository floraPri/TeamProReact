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

const chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSend = () => {
        if (newMessage) {
            const NickName = '테스트 닉네임';
            const message = newMessage;
            const messageFull = { NickName, message };
            setMessages([...messages, messageFull]);
            setNewMessage('');
        }
    };

    useEffect(() => {
        // 스크롤을 아래로 이동하여 최신 메시지를 표시
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    return (
        <div>
        <h1>HOST</h1>
        <ChatContainer id="chat-container">
            {messages.map((message, index) => (
            <MessageItem key={index} userName={message.NickName} message={message.message} />
            ))}
        </ChatContainer>
        <InputContainer>
            <Input
            type="text"
            placeholder="바르고 고운말을 사용합시다"
            value={newMessage}
            onChange={handleNewMessageChange}
            />
            <SendButton onClick={handleSend}>Send</SendButton>
        </InputContainer>
        </div>
    );
};

export default chat;