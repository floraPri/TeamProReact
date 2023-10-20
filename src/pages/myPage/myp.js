import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import rightStyles from "@/component/myPage/myPRightStyle.module.css";
import { useEffect, useState } from "react";
import axios from "axios";


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

`;

const RightInnerWrap = styled.div`
    width: 960px;
    padding-top: 50px;
`;

const RightInnerTitle = styled.div`
    width: 960px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`;

export default function MyPages (){
  const [userno,setUserno] = useState("");
  const [email,setEmail] = useState("");

  useEffect(() => {
    const userNo = localStorage.getItem('userno');
    const userEmail = localStorage.getItem('email');

    if(userEmail){
      setEmail(userEmail);
    }    

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
        <RightContainer>
            {/** 마이페이지 메인1 */}
            <h3 className={rightStyles.welcomeTitle}><b>{email}</b>님 안녕하세요!</h3>
            <div className={rightStyles.welcomeBox}>
                <p>내가 작성한 게시글<span className={rightStyles.txtNumber}>52</span></p>
                <p>팔로워<span className={rightStyles.txtNumber}>20</span></p>
                <p>팔로잉<span className={rightStyles.txtNumber}>109</span></p>
            </div>

            {/** 마이페이지 내 피드 */}
            <RightInnerWrap>
                <RightInnerTitle>
                    <h3 className={rightStyles.h3_title}>{email}님 피드</h3> <p><Link href="">더 보기</Link></p>
                </RightInnerTitle>
                <ul className={rightStyles.feedWrapUl}>
                    <li>
                      <div className={rightStyles.liInner}>
                        <p>타이틀.....사고싶은것들이 넘 많다...내일도 나온다..</p>
                        
                      </div>
                    </li>
                    <li>
                      <div className={rightStyles.liInner}>
                        <p>타이틀.....사고싶은것들이 넘 많다...내일도 나온다..</p>
                        
                      </div>
                    </li>
                    <li>
                      <div className={rightStyles.liInner}>
                        <p>타이틀.....사고싶은것들이 넘 많다...내일도 나온다..</p>
                        
                      </div>
                    </li>
                </ul>
            </RightInnerWrap>           
        </RightContainer>        
        {/** <MyPageRight /> */}
      </Container>
    )
}