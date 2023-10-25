import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Menubar from "@/component/funding/menubar";
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
    display: grid;
	align-items:center;
    justify-content: center;
	width: 100%;
	height: 100%;
`;

const ListContainer = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 1fr);
`;

const FundingContainer = styled.div`
    margin: 5px 5px 5px 5px;
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	max-width:180px;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;

const FundingImg = styled.img`
    width:100%;
    max-width:250px;
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

export default function Funding(){
    const router = useRouter();

    const [fundings, setFundings] = useState([]);
  
    useEffect(() => {
        console.log("funding useEffect start")
        axios.get(`http://localhost:8081/funding/funding`,{
            headers: {
                'Content-Type': 'multipart/form-data', // 파일 업로드에 대한 헤더 설정
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

    return(

    <Container>

    <Menubar/>
			
    <ListContainer>					
            {fundings.map((funding) => (
        <FundingContainer onClick={() => router.push(`/funding/fundingDetail?fundingcode=${funding.fundingcode}`)}>
            <div key={funding.fundingcode}>
            <FundingImg src={funding.image}/>
            <div>
                <Category> {funding.category} </Category>
                <Title> {funding.title} </Title>
                <PreContent> {funding.subcontent} </PreContent>
            </div>
            </div>
        </FundingContainer>
            ))}



        <FundingContainer onClick={() => router.push('/funding/fundingDetail')}>
            <FundingImg src="/assets/images/auction/ac1.png"/>
            <div>
                <Category> category </Category>
                <Title> title </Title>
                <PreContent> 상세설명 상세설명 상세설명 상세설명 상세설명 </PreContent>
            </div>
        </FundingContainer>
        <FundingContainer onClick={() => router.push('/funding/fundingDetail')}>
            <FundingImg src="/assets/images/auction/ac1.png"/>
            <div>
                <Category> category </Category>
                <Title> title </Title>
                <PreContent> 상세설명 상세설명 상세설명 상세설명 상세설명 </PreContent>
            </div>
        </FundingContainer>
        <FundingContainer onClick={() => router.push('/funding/fundingDetail')}>
            <FundingImg src="/assets/images/auction/ac1.png"/>
            <div>
                <Category> category </Category>
                <Title> title </Title>
                <PreContent> 상세설명 상세설명 상세설명 상세설명 상세설명 </PreContent>
            </div>
        </FundingContainer>
        <FundingContainer onClick={() => router.push('/funding/fundingDetail')}>
            <FundingImg src="/assets/images/auction/ac1.png"/>
            <div>
                <Category> category </Category>
                <Title> title </Title>
                <PreContent> 상세설명 상세설명 상세설명 상세설명 상세설명 </PreContent>
            </div>
        </FundingContainer>
        
    </ListContainer>

    </Container>
    )

}