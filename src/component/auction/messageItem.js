import React from 'react';
import styled from 'styled-components';

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

const MessageItem = ({ userName, message }) => (
  <MessageContainer>
    <NickName>{userName}:</NickName>
    <MessageText>{message}</MessageText>
  </MessageContainer>
);

export default MessageItem;