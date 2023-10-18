// 메세지 세부
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import { useRouter } from 'next/router';


const Container = styled.div`
  margin: 5px 15px 5px 5px;
  padding: 20px 5px 20px 5px;
  background: rgba(209,240,228,0.7);
  white-space: pre-line;
  height: 95%;
  width: 480px;
  `;
const Container2 = styled.div`
  grid-template-rows: repeat(2, 1fr);
  align-items: center;

`;

export default function MessageRoom (){

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
      const { userno } = router.query;
  
      if (userno) {
        msgList(userno);
      }
    }, []);

    const msgList = (userno) =>{
        console.log("msglist 호출");
        console.log("no :", userno);
        axios.get(` `).then(response => {
            console.log("axios");
            setMsgno(response.data.msgno)
            setRoom(response.data.room)
            setSender(response.data.sender)
            setReicever(response.data.reicever)
            setSendtime(response.data.sendtime)
            setContent(response.data.content)
            setReadChk(response.data.readchk)

        })
        .catch(error => {
            console.log(error);
        })

    }

    return(
      <Container>
        <Container2>
        <Left>
            <ReceiveMsg1>
                <p>수신자:{reicever}</p><p>{content}</p>&nbsp;&nbsp;{sendtime}
                <p>읽음확인:{readchk}</p>
                <p>re</p>
            </ReceiveMsg1>
        </Left>

        <Right>
                <SendMsg>
                <p>발신자:{sender}</p><p>{content}</p>&nbsp;&nbsp;{sendtime}
                <p>se</p>
                </SendMsg>
        </Right>
        </Container2>
        <Center>
            <SendBar>
                <SendInput placeholder="메세지를 입력하세요">
                </SendInput>
                <SendIcon><BsSend style={{width:'20px',height:'20px'}}/> </SendIcon>
            </SendBar>
        </Center>

      </Container>
   )
}
const Left = styled.div`
    display: flex;
    justify-content: left;
    align-items: left;
`;
const Right = styled.div`
    display: flex;
    justify-content: right;
    align-items: right;
`;
const Center = styled.div`
    display: flex;
    justify-content: Center;
    align-items: Center;
    grid-template-columns: repeat(2, 1fr);
`;

const ReceiveMsg1 = styled.div`
    align: "left";
    background: white;
    align-items: left;
    text-align: left;
    margin: 5px 10px 5px 10px;
    width: 300px;
    padding: 5px 5px 5px 5px;
    `;
    
const SendMsg = styled.div`
    align: "right";
    background: rgb(155, 232, 242);
    align-items: right;
    text-align: right;
    margin: 5px 10px 5px 10px;
    width: 300px;
    padding: 5px 5px 5px 5px;
    `;
const SendBar = styled.div`
    width: 440px;
    height: 42px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    
`;

const SendInput = styled.input`
    margin: 2px 2px 2px 2px;
    width: 90%;
    height: 80%;
`;

const SendIcon = styled.div`
    padding: 5px 5px 2px 5px;
    cursor: pointer;
    &:hover {
        color: #1877F2;
    }
`;
