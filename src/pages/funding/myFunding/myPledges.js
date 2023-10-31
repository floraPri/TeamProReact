import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Menubar from "@/component/funding/menubar";
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
    display: grid;
    min-width: 1280px;
    justify-content: center;
    text-align: center;
    padding: 20px 0;
`;

const MenuTitle = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:600;
    margin-top:20px;
    margin-bottom:20px;
    padding: 10px 0px 6px 0px;
`;

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // flex-direction: column;
    gap: 20px;
    width:90%;
    align-items: center;
    justify-content: center;
`;

const Container2 = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    width:550px;
    padding: 30px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;

`;

const FundingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    &:hover {
        color: rgb(3,193,121, 0.6);
    }
`;

const FundingImg = styled.img`
    width: 200px;
    margin: 0 auto 20px;
`;

const Category = styled.div`
    margin-top: 5px;
    text-align:center;
    font-weight:600;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 16px;
    margin: 5px 0;
`;

const PreContent = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const RewardContainer = styled.div`
    display:flex;
    flex-direction: column;
    background-color: #f9f9f9;
`;
const RewardTitle = styled.div`
    text-align:center;
    justify-content: center;
    font-size:16px;
    font-weight:600;
    margin-top:5px;
    margin-bottom:5px;
`;
const SubTitle = styled.div`
    text-align:center;
    justify-content: center;
    font-size:15px;
    font-weight:600;
    margin-top:35px;
    margin-bottom:5px;
`;
const Content = styled.div`
    text-align:center;
`;
const DeliveryDate = styled.div`
    text-align:right;
    margin: 8px 0;
    padding-right:5px;
    font-size:10px;
    font-color:grey;
`;

const Center = styled.div`
    text-align:center;
`;

export default function MyPledges(){
    const router = useRouter();
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const userno = localStorage.getItem('userno');
        console.log("후원한 목록 useEffect start : " + userno)
        axios.get(`http://localhost:8081/funding/myPledges?userno=${userno}`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
            }
        })
          .then(response => {
            console.log('axios')
            console.log(response.data)
            if (Array.isArray(response.data)) {
                setData(response.data);
            }
          })
          .catch(error => {
            console.log(error);
          })
     
        }, []);

        // 날짜만
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR');
        }; 
        // 시간도
        // const formatDate = (dateString) => {
        //     const date = new Date(dateString);
        //     return date.toLocaleString('ko-KR');
        //   };

        // 달성률
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
    return(
    <Container>
        <Menubar/>
        <MenuTitle> 후원한 목록 </MenuTitle>
<ListContainer>
        {data.map((view) => (
            <div key={view.userno}>
            <Container2>
            <FundingContainer onClick={() => router.push(`/funding/fundingDetail?fundingcode=${view.fundingcode}`)}>

            <FundingImg src={view.image}/>
            <Center>
                <Category> {renameCategory(view.category)} </Category>
                <Title> {view.title} </Title>
                <PreContent> {view.precontent} </PreContent>
                <Center>{view.nowamount}원, {achievementRate(view.nowamount,view.goalamount)}% 달성 <br/></Center>
            </Center>
            </FundingContainer>
            <RewardContainer>
                <SubTitle> 후원 리워드 </SubTitle>
                <RewardTitle> {view.rewardtitle} </RewardTitle>
                <Content>{view.rewardcontent}</Content>
                주소 : {view.address}<br/>
                갯수 : {view.quantity}<br/>
                후원액 : {view.quantity * view.price}<br/>
                후원일 : {formatDate(view.regdate)}<br/>
                <DeliveryDate> {formatDate(view.delivery)} 배송 예정 </DeliveryDate>
            </RewardContainer>
            </Container2>
            </div>
            ))}
</ListContainer>
    </Container>
        
    )

}