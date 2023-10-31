import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import axios from 'axios';
import Menubar from "@/component/funding/menubar";
import { getAuthToken } from "@/component/user/axios_helper";
import RewardsList from "@/component/funding/rewardsList";

const Container = styled.div`
    display: grid;
    justify-content: center;
    white-space: pre-line;
    font-size:12px;
`;
const Container2 = styled.div`
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    `;
const Container3 = styled.div`
    padding:10px;
    width:400px;
    margin: 10px;
`;
    
const ImgContainer = styled.img`
    height:100%;
    width:400px;
    margin-left:auto;
    margin-right:30px;;
    padding:10px;
    align-items:right;
    text-align:right;
    `;
    
const SupportBtn = styled.div`
    text-align:center;
    justify-content: center;
    width:100px;
    padding:10px;
    margin:auto;
    margin-top:20px;
    font-size:14px;
    font-weight:600;
    background:rgba(3, 193, 121, 0.4);
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;
const Content = styled.div`
    text-align:center;
    font-size:12px;
    margin-left:130px;
    padding: 40px;
    width:500px;
`;
const Rewards = styled.div`
    text-align:center;
    width:380px;
`;
const Container4 = styled.div`
    text-align:center;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    margin:10px;
`;

const Category = styled.div`
    margin-top:20px;
    text-align:center;
    font-weight:600;
    justify-content: center;
`;
const Title = styled.div`
    text-align:center;
    justify-content: center;
    font-size:24px;
    font-weight:600;
    margin-top:5px;
`;
const Box = styled.div`
    padding:5px;
    margin:5px;
    width:300px;
`;

const Bold = styled.div`
    margin: 3px 0px 3px 0px;
    font-size:20px;
    font-weight:500;
    `;
const Right = styled.div`
    text-align:right;
    justify-content: right;
`;


export default function FundingDetail(){
    const router = useRouter();
    const { fundingcode } = router.query;

    const [funding, setFunding] = useState([]);

    // 날짜 문자열을 Date 객체로 변환
    const parseDate = (dateString) => {
        return new Date(dateString);
    };

    // 두 날짜의 차이 계산
    const dueDate = (endDate, startDate) => {
        const timeDifference = endDate - startDate;
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    };

    const achievementRate = (nowamount, goalamount) => {
        if (goalamount === 0) {
          throw new Error("0으로 나눌 수 없음");
        }
      
        return Math.round((nowamount / goalamount) * 100);
      };

      const renameCategory = (category) => {
        switch (category) {
            case 'stationery':
            return '문구';
            case 'book':
            return '출판';
            case 'game':
            return '게임';
            case 'living':
            return '리빙';
            case 'pet':
            return '반려동물';
            default:
            return category;
        }
    } 
    useEffect(() => {
        console.log("useEffect start")
        axios.get(`http://localhost:8081/funding/fundingDetail?fundingcode=${fundingcode}`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
            }
        })
          .then(response => {
            // console.log("api:", response.data)
            console.log('axios - fundingDetail')
            console.log(response.data)
            if (Array.isArray(response.data)) {
                setFunding(response.data);
            } else if (typeof response.data === 'object') {
                // 객체를 배열로 감싸서 설정
                setFunding([response.data]);
            }
          })
          .catch(error => {
              console.log(error);
          });
          
          
        }, [fundingcode]);
    // 날짜 문자열을 원하는 형식으로 변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR');
    }; 


        
    return(
        
        <Container>
        <Menubar/>
        {funding.map((detail)=> (
           <div key={detail.fundingcode}>
        <Category> {renameCategory(detail.category)} </Category>
        <Title> {detail.title}</Title>
        <Container2>
            <Right>
            <ImgContainer src={detail.image}/>
            </Right>
            <Container3>
                <Box>
                    모인 금액 <br/>
                    <Bold> {detail.nowamount} <br/></Bold>
                    펀딩 기간<br/>
                    <Bold> {dueDate(parseDate(detail.enddate), parseDate(detail.startdate))} 일 <br/></Bold>
                    후원자 <br/>
                    <Bold> 5명 <br/></Bold>
                </Box>
                <Table>
                    <TableRow>
                        <TableCell> 목표금액 </TableCell>
                        <TableCell> {detail.goalamount} 원, {achievementRate(detail.nowamount,detail.goalamount)}% 달성</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> 펀딩기간 </TableCell>
                        <TableCell> {formatDate(detail.startdate)} ~ {formatDate(detail.enddate)} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> 결제 </TableCell>
                        <TableCell> {formatDate(detail.enddate)} 익일 결제 </TableCell>
                    </TableRow> 
                </Table>
                <SupportBtn onClick={() => router.push('/funding/funding')}>
                    목록으로
                </SupportBtn>
            </Container3>       
        </Container2>
        <Container4>
        <Content>
        {detail.content}
        </Content>
        <Rewards>
        <RewardsList />
        </Rewards>


        </Container4>
        </div> 
            ))}    
    </Container>
        
        )
    }