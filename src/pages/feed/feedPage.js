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


const Container = styled.div`
    display: grid;
    justify-content: center;
    white-space: pre-line;
    font-size:12px;
    /* margin: 10px; */
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
    margin: 0px auto 0;
    width: 100%;
`;

const Li = styled.li`
    padding-bottom: 50px;
`;

const ThumbImage = styled.img`
  width: 400px; 
  height: auto;
`;

const LoadMoreTrigger = styled.div`
    height: 20px;
    margin: 10px 0;
    text-align: center;
`;

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function FeedPage(){
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);

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
        
        setLoading(true);
        console.log(page);
        axios.get(`http://localhost:8081/feed/feedPageScroll?page=${page}`)
        .then((response) => {
            if(response.data && response.data.length > 0){
                console.log("api응답~~~~~~", response.data);
                setFeeds(prevFeeds => [...prevFeeds, ...response.data]);
                setDataList(response.data);
            } 
            setDataList(response.data);
            console.log("dataList",dataList.length);
            setLoading(false);  // 여기에서만 로딩 상태를 false로 설정합니다.
        })
        .catch(error => {
            console.log(error);
        });
    }, [page]);
    
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
    
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !loading) {
                    console.log("Loading more feeds...");
                    setPage(prevPage => prevPage + 1);  // 여기에서 페이지를 증가시킵니다.
                }
            });
        }, options);
        
        const target = document.querySelector('#loadMoreTrigger');
        if (target) observer.observe(target);
        
        return () => {
            if (target) observer.unobserve(target);
        };
    }, [loading]);

    return(
    <Container>
        <ResetStyles />
        {feeds === null ? (
            <p>게시물이 없습니다.</p>
        ) : (
        <UlList>
            {feeds.map((feed,index) => (
            <Li key={index}>
                <div>
                    <Link
                        href={`/feed/feedListByIdPage?userid=${feed.userid}`}
                        as={`/feed/feedListByIdPage?userid=${feed.userid}`}>
                        <h2 className={feedStyles.idWrap}>{feed.userid}</h2>
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
                </div>
            </Li>
            ))}
            {dataList && dataList.length !== 0 ?
             <LoadMoreTrigger id="loadMoreTrigger">Loading...</LoadMoreTrigger> 
             : null
             }
            
        </UlList>
        )}
    </Container>       
    );
}