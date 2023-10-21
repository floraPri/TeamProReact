import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import Menubar from "@/component/funding/menubar";
import axios from 'axios'

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
    width:500px;
    margin: 10px;
`;
    
const ImgContainer = styled.img`
    height:100%;
    max-width:400px;
    margin-left:auto;
    margin-right:auto;
    padding:10px;
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
`;
const Rewards = styled.div`
    text-align:center;
`;
const Container4 = styled.div`
    text-align:center;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    margin:10px;
`;

const Category = styled.div`
    text-align:center;
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
`;

const Bold = styled.div`
    margin: 3px 0px 3px 0px;
    font-size:20px;
    font-weight:500;
`;
export default function FundingDetail(){
    const router = useRouter();
    const { fundingcode } = router.query;

    const [funding, setFunding] = useState([]);

    useEffect(() => {
        console.log("useEffect start")
        axios.get(`http://localhost:8081/funding/fundingDetail?fundingcode=${funding.fundingcode}`)
          .then(response => {
            // console.log("api:", response.data)
            console.log('axios')
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


    }, []);

    return(
        <Container>
        <Menubar/>
        1234
        {funding.map((detail)=> (
           <div key={detail.fundingcode}>
        <Category> 1234 {detail.category} </Category>
        <Title> detail - 펀딩 제목 </Title>
        <Container2>
            <ImgContainer src="/assets/images/auction/ac1.png"/>
            <ImgContainer src={detail.image}/>
            <Container3>
                <Box>
                    모인 금액 <br/>
                    <Bold> {detail.nowamount} <br/></Bold>
                    남은 시간 <br/>
                    <Bold> 27일 <br/></Bold>
                    후원자 <br/>
                    <Bold> 110명 <br/></Bold>
                </Box>
                <Table>
                    <TableRow>
                        <TableCell> 목표금액 </TableCell>
                        <TableCell> {detail.goalamount} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> 펀딩기간 </TableCell>
                        <TableCell> {detail.startdate} ~ {detail.enddate} (n일남음) </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> 결제 </TableCell>
                        <TableCell> 기간 끝나면 </TableCell>
                    </TableRow> 
                </Table>
                <SupportBtn onClick={() => router.push('/funding/funding')}>
                    후원하기
                </SupportBtn>
            </Container3>       
        </Container2>
        <Container4>
        <Content>
        {detail.content}

        </Content>
        <Rewards>
        rewards

        </Rewards>
        </Container4>
        </div> 
            ))}    
    </Container>
        
    )
}