import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Menubar from "@/component/funding/menubar";
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
    display: flex;
    flex-direction: column;
	align-items: center;
    justify-content: center;
	width: 100%;
	height: 100%;
    margin-bottom:30px;
    `;
    
const ListContainer = styled.div`
    margin-top:20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;
`;

const FundingContainer = styled.div`
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
    cursor: pointer;
    &:hover {
        color: #03C179;
        background:rgb(3,193,121, 0.1);
        border-radius: 8px;
    }
    padding:10px;
    margin-bottom:25px;
    width:300px;
`;

const FundingImg = styled.img`
    width: 270px;
    height: 270px;
    object-fit: cover; // 비율 유지, 꽉차게 설정
    margin-top:10px;
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
    color:grey;
    opacity:0.9;
    height:30px;
    `;
const AchievementRate = styled.div`
    text-align:right;
    font-weight:600;
    font-size:12px;
    opacity:0.9;
    
`;

export default function Funding(){
    const router = useRouter();

    const [fundings, setFundings] = useState([]);
  
    useEffect(() => {
        console.log("funding useEffect start")
        axios.get(`http://localhost:8081/funding/funding`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
            }
        })
          .then(response => {
            // console.log("api:", response.data)
            console.log('axios')
            console.log(response.data)
            if (Array.isArray(response.data)) {
                setFundings(response.data);
            }
          })
          .catch(error => {
            console.log(error);
          })
     
        }, []);

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
    const achievementRate = (nowamount, goalamount) => {
        if (goalamount === 0) {
          throw new Error("0으로 나눌 수 없음");
        }
      
        return Math.round((nowamount / goalamount) * 100);
      };        
    return(

    <Container>
        <Menubar/>
        <ListContainer>					
                {fundings.map((funding) => (
            <FundingContainer onClick={() => router.push(`/funding/fundingDetail?fundingcode=${funding.fundingcode}`)}>
                <div key={funding.fundingcode}>
                <FundingImg src={funding.image} alt="Funding Image"/>
                <div>
                    <Category> {renameCategory(funding.category)} </Category>
                    <Title> {funding.title}</Title>
                    <PreContent> {funding.precontent} </PreContent>
                    <AchievementRate>{funding.nowamount}원, {achievementRate(funding.nowamount, funding.goalamount)}% 달성</AchievementRate>
                </div>
                </div>
            </FundingContainer>
                ))}
        </ListContainer>
    </Container>
    )

}