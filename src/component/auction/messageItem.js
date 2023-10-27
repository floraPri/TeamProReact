import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NickName = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

const MessageText = styled.div`
  background-color: #f2f2f2;
  padding: 5px;
  margin: 5px;
`;

const MessageItem = ({ isMyMessage, message }) => {
  
  const [userName, setUserName] = useState('');

  useEffect(()=> {
    const nameSetLocalStorage = localStorage.getItem('name');
    setUserName(nameSetLocalStorage)
  }, []);

  return (
      <MessageContainer isMyMessage={isMyMessage}>
          <NickName>{isMyMessage ? userName : '참가자들'}:</NickName>
          <MessageText>{message}</MessageText>
      </MessageContainer>
  );
}

export default MessageItem;