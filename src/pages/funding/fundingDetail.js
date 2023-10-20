import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import Menubar from "@/component/funding/menubar";

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
    
    return(
        <Container>
        <Menubar/>    
        <Category> 카테고리 </Category>
        <Title> detail - 펀딩 제목 </Title>
        <Container2>
            <ImgContainer src="/assets/images/auction/ac1.png"/>
            <Container3>
                <Box>
                    모인 금액 <br/>
                    <Bold> 1000 <br/></Bold>
                    남은 시간 <br/>
                    <Bold> 27일 <br/></Bold>
                    후원자 <br/>
                    <Bold> 110명 <br/></Bold>
                </Box>
                <Table>
                    <TableRow>
                        <TableCell> 목표금액 </TableCell>
                        <TableCell> 4,300원 </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> 펀딩기간 </TableCell>
                        <TableCell> aa.aa.aa ~ bb.bb.bb (n일남음) </TableCell>
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
        내용

        </Content>
        <Rewards>
        rewards

        </Rewards>
        </Container4>
    </Container>
        
    )
}