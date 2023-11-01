import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
    display: grid;
    width:300px;
    padding:10px;
    justify-content: left;
    grid-template-rows: repeat(2, 1fr);
    `;
const Title = styled.div`
    font-size:15px;
    font-weight:600;

`;
const NewsContainer = styled.div`
    display: grid;
    grid-template-columns: min-content auto min-content;
    padding:5px;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;
const Section = styled.div`
    font-size:13px;
    font-weight:600;
    width: 45px;
    padding-left:2px;
    padding-right:2px;
    `;
const NewsTitle = styled.div`
    width:220px;
    font-size:13px;

`;
const RegDate = styled.div`
    text-align:right;
    font-size:12px;

`;

export default function News(){
    const router = useRouter();
    const [news, setNews] = useState([]);

    useEffect(() => {
        console.log("news useEffect start")
        axios.get(`http://localhost:8081/news/news_?limit=5`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
            }
        })
          .then(response => {
            // console.log("api:", response.data)
            console.log('axios news')
            console.log(response.data)
            if (Array.isArray(response.data)) {
                setNews(response.data);
            }
          })
          .catch(error => {
            console.log('newerror',error);
          })
     
        }, []);

    const renameSection = (newssection) => {
        switch (newssection) {
            case 102:
            return '사회';
            case 103:
            return '생활';
            case 104:
            return '세계';
            default:
            return newssection;
        }
    } 
return(
    <Container>
    <Title> NEWS </Title>
    {news.map((n) => {
        const shortenedTitle = n.title.length > 19 ? n.title.substring(0, 19) + "..." : n.title;
        return (
            <div key={n.newsno}>
                <NewsContainer onClick={() => router.push(`${n.url}`)}>
                    <Section> [{renameSection(n.newssection)}] </Section>
                    <NewsTitle> {shortenedTitle} </NewsTitle>
                    <RegDate> {(n.regdate).substring(2,10)} </RegDate>
                </NewsContainer>
            </div>
        );
    })}
    </Container>
)

}