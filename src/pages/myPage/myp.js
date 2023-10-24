import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import rightStyles from "@/component/myPage/myPRightStyle.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { RiPencilFill } from "react-icons/Ri";
import { getAuthToken } from "@/component/user/axios_helper";

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
  const [feeds,setFeeds] = useState([]);

  const formatTimeStamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      //hour: "2-digit",
      //minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(new Date(timestamp));
    return formattedDate;
  };

  useEffect(() => {
    const userNo = localStorage.getItem('userno');
    const userEmail = localStorage.getItem('email');
    

    if(userEmail){
      setEmail(userEmail);
    }    

    if(userNo){
      setUserno(userNo);

      axios.get(`http://localhost:8081/myPage/myp?userno=${userNo}`,{
        headers: {
          Authorization: `Bearer ${(getAuthToken())}`
       }
      })
      .then((response) => {
        if(response.data){
          console.log('서버로부터 받은 myp:', response.data);
        }

        setFeeds(response.data);
        console.log(response.data);
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
                    {feeds.map((feed,index) => (
                      
                      <li key={index}>
                        <div className={rightStyles.liInner}>
                          <h3>{feed.feedtitle}</h3>
                          <p className={rightStyles.txtDate}>{formatTimeStamp(feed.feedregdate)}</p>
                          <p className={rightStyles.txtArea}>
                            {feed.feedcontent}
                          </p>
                          <p className={rightStyles.imgWrap}>
                            <Image 
                              src={feed.feedimg.replace('http://localhost:8081', '')}
                              width="250" 
                              height="190"
                              objectFit="cover" 
                              alt={feed.feedtitle} />
                            </p>
                            {feed.feedimg}
                            <div className={rightStyles.btnWarp}>
                              <span><MdDeleteForever size="24" /></span>
                              <span><RiPencilFill size="24" /></span>
                            </div>
                        </div>
                      </li>
                    ))}
                </ul>
            </RightInnerWrap>           
        </RightContainer>        
        {/** <MyPageRight /> */}
      </Container>
    )
}