import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Menubar from "@/component/funding/menubar";
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
    display: grid;
    min-width:1280px;
    justify-content: center;
    text-align:center;
`;
const MenuTitle = styled.div`
    font-weight:600;
    font-size:16px;
`;
const ListContainer = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    align-items:center;
`;
const Container2 = styled.div`
    margin: 10px;
    border:1px solid grey;
    display:grid;
    grid-template-rows: repeat(2, 1fr);
   
`;

const FundingContainer = styled.div`
    margin: 5px 5px 5px 5px;
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	width:270px;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;

const RewardContainer = styled.div`
    width:270px;
`;

const FundingImg = styled.img`
    width:100%;
    width:250px;
    height:auto;
    align-items:center;
`;

const Category = styled.div`
    margin-top:5px;
    font-size:10px;
`;

const Title = styled.div`
    font-weight:600;
    font-size:12px;
`;

const PreContent = styled.div`
    margin-top:5px;
    font-size:10px;
    color:lightgrey;
    opacity:0.9;
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
        <MenuTitle> MyPledges </MenuTitle>
<ListContainer>
        {data.map((view) => (
            <div key={view.userno}>
            <Container2>
            <FundingContainer onClick={() => router.push(`/funding/fundingDetail?fundingcode=${view.fundingcode}`)}>

            <FundingImg src={view.image}/>
            <div>
                <Category> {renameCategory(view.category)} </Category>
                <Title> {view.title} </Title>
                <PreContent> {view.precontent} </PreContent>
            </div>
            </FundingContainer>
            <RewardContainer>
                후원펀딩 ~ {view.title}<br/>
                달성률 : {achievementRate(view.nowamount,view.goalamount)}% 달성 <br/>
                주소 ~ {view.address}<br/>
                갯수 ~ {view.quantity}<br/>
                금액 ~ {view.quantity * view.price}<br/>
                후원일 ~ {formatDate(view.regdate)}<br/>
            </RewardContainer>
            </Container2>
            </div>
            ))};
</ListContainer>
    </Container>
        
    )

}