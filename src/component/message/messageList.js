// 메세지 목록(main) 검색!
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
  const [msgno, setMsgno] = useState('')
    const [room, setRoom] = useState('')
    const [sender, setSender] = useState('')
    const [reicever, setReicever] = useState('')
    const [sendtime, setSendtime] = useState('')
    const [content, setContent] = useState('')
    const [readchk, setReadChk] = useState('')
    const router = useRouter();
  
    useEffect(() => {
      // 페이지가 로드될 때 userNo 파라미터를 확인하고 데이터를 가져오는 로직을 수행
      const { room } = router.query;
  
      if (room) {
        msgList(room);
      }
    }, []);

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
  
    function formatDate(epochTime) {
      const date = new Date(epochTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  // const [searchValue, setSearchValue] = useState(''); // 추가: 검색어 상태
  // const [showResult, setShowResult] = useState(false); // 검색 결과를 나타내는 상태
  // const router = useRouter();
  
  // useEffect(() => {
  //   // 페이지가 로드될 때 userNo 파라미터를 확인하고 데이터를 가져오는 로직을 수행
  //   const { userno } = router.query;

  //   if (userno) {
  //     handleSearch(userno);
  //   }
  // }, []);

  // function formatDate(epochTime) {
  //   const date = new Date(epochTime);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }
  
  // const handleSearch = (userno) => {
  //   console.log("시작")
  //   console.log(searchValue)
  //   axios.get(`http://localhost:8081/admin/adminSearchUser?userno=${searchValue}`)
  //     .then(response => {
  //       console.log("axios")
  //       setUserno(response.data.userno);
  //       setEmail(response.data.email);
  //       setName(response.data.name);
  //       setPhone(response.data.phone);
  //       const formattedJoinDate = formatDate(response.data.joindate);
  //       setJoindate(formattedJoinDate); // 변환된 날짜를 상태에 업데이트
  //       setShowResult(true); // 검색 결과가 있을 때 상태 업데이트
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setShowResult(false); // 검색 결과가 없을 때 상태 업데이트
  //     });
  // };

    return(
      <Container>
        <List>
            <p> messageList.js </p>
            <RoomList>
            <ProfileImg> </ProfileImg> 
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

