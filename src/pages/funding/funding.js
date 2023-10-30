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
    width: 75%;
`;

const FundingContainer = styled.div`
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;

const FundingImg = styled.img`
    width:270px;
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
    color:lightgrey;
    opacity:0.9;
    height:50px;
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
                    <Title> {funding.title} </Title>
                    <PreContent> {funding.precontent} </PreContent>
                </div>
                </div>
            </FundingContainer>
                ))}
        </ListContainer>
    </Container>
    )

}