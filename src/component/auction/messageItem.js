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

const MessageItem = ({ message }) => {

const [userName, setUserName] = useState('');

useEffect(()=> {
  const nameSetLocalStorage = localStorage.getItem('name');
  setUserName(nameSetLocalStorage)
}, []);

  return ( //반환 안하면 오류남
    <MessageContainer>
      <NickName>{userName}:</NickName>
      <MessageText>{message}</MessageText>
    </MessageContainer>
  );
}

export default MessageItem;