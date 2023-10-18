// 데이터 가져오기 , 테스트 해야함
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageRoom from "./messageRoom";
import { useRouter } from 'next/router';
import axios from "axios";

const Container = styled.div`
  display: flex;
  min-width:1280px;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  grid-template-columns: repeat(2, 1fr);
  white-space: pre-line;
`;

export default function MessageList (){
  const [responseData, setResponseData] = useState([])
  const [msgno, setMsgno] = useState('')
  const [room, setRoom] = useState('')
  const [sender, setSender] = useState('')
  const [reicever, setReicever] = useState('')
  const [sendtime, setSendtime] = useState('')
  const [content, setContent] = useState('')
  const [readchk, setReadChk] = useState('')
  const router = useRouter();
  
    useEffect(() => {
      // 페이지가 로드될 때 파라미터를 확인하고 데이터를 가져오는 로직을 수행
      axios.get(`http://localhost:3000/message/messageList`).then(response => {
      // 응답 데이터를 상태에 저장
      setResponseData(response.data);
    })
    .catch(error => {
      console.error('데이터 가져오기 실패:', error);
    });
  });

    const msgList = (room) =>{
        console.log("msglist 호출");
        console.log("no :", room);
        axios.get(`http://localhost:3000/message/messageList`).then(response => {
            console.log("axios");
            setMsgno(response.data.msgno)
            setRoom(response.data.room)
            setSender(response.data.sender)
            setReicever(response.data.reicever)
            setSendtime(response.data.sendtime)
            setContent(response.data.content)
            setReadChk(response.data.readchk)
            console.log(response.data.receiver)
        })
        .catch(error => {
            console.log(error);
        })

    }
  

    return(
      <Container>
        <List>
            <p> messageList.js </p>
            <RoomList> <msgList/>
            <ProfileImg> ad </ProfileImg> 
            <p> {reicever} </p>
            <p> {content} </p>
            <p> {sendtime} </p>
            </RoomList>
        </List>
        <Room>
        <p>messageRoom.js</p>
            {/* <MessageRoom/> */}
        </Room>
      </Container>
    )
}


const List = styled.div`
  margin-right: 5px;
  border: 0.5px solid #74e8bc;
  border-radius: 10px;
  width: 400px;
  height: 650px;
  padding: 5px 5px 5px 5px;
  `;
const Room = styled.div`
  margin-left: 5px;
  border: 0.5px solid #74e8bc;
  border-radius: 10px;
  width: 500px;
  height: 650px;
  padding: 5px 5px 5px 5px;
  justify-content: center;
`;

const RoomList = styled.div`
  margin: 10px 10px 10px 10px;
  padding: 5px 5px 5px 5px;
  width: 370px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  grid-template-columns: repeat(2, 1fr);
  display: flex;
`;
const ProfileImg = styled.div`
  margin: 0px 5px 5px 5px;
  margin-top: 5px;
  width: 60px;
  height: 60px;
  background: rgba(0,0,0,0.4);
  border-radius:50px;
`;
