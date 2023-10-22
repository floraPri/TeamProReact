import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import MyPageRight from "@/component/myPage/myPageRight";
import { useEffect, useState } from "react";
import axios from "axios";


const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

export default function MyPages (){
  const [userno,setUserno] = useState("");

  useEffect(() => {
    const userNo = localStorage.getItem('userno');
    if(userNo){
      setUserno(userNo);

      axios.get(`http://localhost:8081/myPage/myp?userno=${userNo}`).then((response) => {
        if(response.data){
          console.log('서버로부터 받은 myp:', response.data);
        }
      }).catch((error) => {
        console.log('전송 오류myp',error)
      });
    }
  },[]);

    return(
      <Container>
        <MyPagesMenu />
        <MyPageRight />
      </Container>
    )
}