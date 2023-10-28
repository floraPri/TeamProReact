import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import MyChannelInfo from "@/component/myPage/myChannelInfo";
import MyFeedList from "./myfeedList";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";

//내 채널 페이지

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;
    objectFit="cover"
`;

const RightInnerWrap = styled.div`
    width: 960px;
    padding-top: 50px;
`;

export default function MyChannelPage(){
    
const [userno,setUserno] = useState("");
const [feedData, setFeedData] = useState([]);

useEffect(() => {
    const userNo = localStorage.getItem('userno');

    if(userNo){
        setUserno(userNo);
        axios.get(`http://localhost:8081/myPage/myChannel?userno=${userNo}`,{
            headers: {
              Authorization: `Bearer ${(getAuthToken())}`
           }
          })
        .then((response) => {
            if(response.data){
                console.log('서버로부터 받은 myChannel: ', response.data);
            }
            setFeedData(response.data);
        })
        .catch((error) => {
            console.log('전송오류 myChannel', error);
        });
    }
}, []);
    

    return(
        <Container>
            <MyPagesMenu />
            <RightContainer>
                <MyChannelInfo />
                <MyFeedList feedData={feedData} />
            </RightContainer>
        </Container>
    );
}