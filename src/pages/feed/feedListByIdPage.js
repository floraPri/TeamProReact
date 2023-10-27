import styled from "styled-components";
import ResetStyles from "@/component/myPage/resetStyles";
import feedStyles from "@/component/feed/feedStyles.module.css";
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useState ,useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";


const Container = styled.div`
    display: grid;
    justify-content: center;
    white-space: pre-line;
    font-size:12px;
    margin: 10px;
    width:100%;
`;

const Title = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:600;
    margin:5px;
    padding: 20px;
`;

const UlList = styled.ul`
    margin: 20px auto 0;
    width: 100%;
`;

const Li = styled.li`
    padding-bottom: 50px;
`;

const ThumbImage = styled.img`
  width: 400px; 
  height: auto;
`;

const ProfileWrap = styled.div`
    margin: 20px auto 0;
    width: 600px;
    height: 150px;
    background: #03C179;
`;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FeedListByIdPage(){
    const router = useRouter();
    const { userid } = router.query || {userid: ''};

    const [feedData, setFeedData] = useState(null);

    const fetchfeedData = () => {
        axios.get(`http://localhost:8081/feed/feedListByIdPage?userid=${userid}`).then((response) => {
            if(response.data){
                console.log("feedListByIdPage 응답!!!!!!", response.data);
                setFeedData(response.data);
            } else {
                setFeedData([]);
            }
        }).catch(error => {
            console.log(error);
        });
    }

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
        console.log("feedListById의 useEffect 시작!!!!");
        fetchfeedData(); //페이지 처음 로드될 때 데이터 가져오기!!!
    }, [userid]); // userid가 변경될 때 다시 호출!!

    const [isChecked, setIsChecked] = useState(false);

    const like = () => {
      // 체크박스가 체크된 상태일 때 실행할 동작을 처리합니다.
      alert('좋아요!');
    }
  
    const dislike = () => {
      // 체크박스가 체크되지 않은 상태일 때 실행할 동작을 처리합니다.
      alert('좋아요 취소');
    }
  
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
  
      // 체크박스 상태에 따라 적절한 함수를 호출합니다.
      if (event.target.checked) {
        like();
      } else {
        dislike();
      }
    }
    
    return(
    <Container>
        <ResetStyles />
        <ProfileWrap>
            <div>
                {userid}
            </div>
        </ProfileWrap>
        {feedData !== null ? (
            <UlList>
            {feedData.map((feed,index) => (
            <Li key={index}>
                <div><h2 className={feedStyles.idWrap}>{feed.userid}</h2></div>
                <div className={feedStyles.boxWrap}>
                    <h3 className={feedStyles.titleWrap}>{feed.feedtitle}</h3>
                    <div className={feedStyles.boxWrap2}>
                        <p className={feedStyles.dateTxt}>등록일: {formatTimeStamp(feed.feedregdate)}</p>
                        <p><Checkbox  checked={isChecked}
                                      onChange={handleCheckboxChange} {...label}
                                icon={<FavoriteBorder style={{ fontSize: 40, color:'red'  }} />} 
                                checkedIcon={<Favorite style={{ fontSize: 40, color:'red' }} />} />
                            
                            <span>00</span> </p>
                    </div>
                    <p className={feedStyles.txtWrap}>
                        {feed.feedcontent}
                    </p>
                    <p>
                    <ThumbImage 
                            src={feed.feedimg}
                            alt={feed.feedtitle} />
                    </p>
                </div>
                <div>
                    댓글부분
                </div>
            </Li>
            ))}
        </UlList>
        ) : (
            <p>게시물이 없습니다.</p>
        )}
    </Container>       
    );
}