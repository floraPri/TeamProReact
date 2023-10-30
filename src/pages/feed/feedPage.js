import styled from "styled-components";
import ResetStyles from "@/component/myPage/resetStyles";
import feedStyles from "@/component/feed/feedStyles.module.css";
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useState ,useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";
import Link from "next/link";
import CommentList from "@/component/feed/commnetList";
import CommentAdd from "@/component/feed/commentAdd";


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
    margin: 50px auto 0;
    width: 100%;
`;

const Li = styled.li`
    padding-bottom: 50px;
    border-radius: 20px;
`;

const ThumbImage = styled.img`
  width: 400px; 
  height: auto;
`;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FeedPage(){
    const [feeds, setFeeds] = useState([]);

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
        console.log("feedPage의 useEffect시작!!!");

        axios.get(`http://localhost:8081/feed/feedPage`)
        .then((response) => {
            if(response.data){
                console.log("api응답~~~~~~", response.data);
                setFeeds(response.data);
            } else {
                setFeeds([]);
            }
        })
        .catch(error=> {
            console.log(error);
        });
    }, []);

    return(
    <Container>
        <ResetStyles />
        {feeds === 0 ? (
            <p>게시물이 없습니다.</p>
        ) : (
        <UlList>
            {feeds.map((feed,index) => (
            <Li key={index}>
                <div className={feedStyles.h2Wrap}>
                    <Link
                        href={`/feed/feedListByIdPage?userid=${feed.userid}&username=${feed.username}`}
                        as={`/feed/feedListByIdPage?userid=${feed.userid}&username=${feed.username}`}>
                        {/* <h2 className={feedStyles.idWrap}>{feed.userid}</h2> */}
                        <h2 className={feedStyles.idWrap}>{feed.username}</h2>
                    </Link>
                </div>
                <div className={feedStyles.boxWrap}>
                    <h3 className={feedStyles.titleWrap}>{feed.feedtitle}</h3>
                    <div className={feedStyles.boxWrap2}>
                        <p className={feedStyles.dateTxt}>등록일: {formatTimeStamp(feed.feedregdate)}</p>
                        <p>
                            <Checkbox 
                                {...label} 
                                icon={<FavoriteBorder style={{ fontSize: 40, color:'red'  }} />} 
                                checkedIcon={<Favorite style={{ fontSize: 40, color:'red' }} />} 
                            />
                            <span>00</span>
                        </p>
                    </div>
                    <p className={feedStyles.txtWrap}>
                        {feed.feedcontent}
                    </p>
                    <p>
                    <ThumbImage 
                            src={feed.feedimg}
                            alt={feed.feedtitle} />
                    </p>
                    {/*  댓글 출력 부분 */}
                    <CommentList feedcode={feed.feedcode} />
                    <CommentAdd feedcode={feed.feedcode} />
                </div>
                
            </Li>
            ))}
        </UlList>
        )}
    </Container>       
    );
}