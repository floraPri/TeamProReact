import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
    display: flex;
	align-items:center;
    grid-template-rows: repeat(2, 1fr);
    justify-content: center;
	width: 100%;
	height: 100%;
`;
const Menu = styled.div`
    width:100px;
    border:1px solid red;
    margin: 5px 5px 5px 5px;
`;

const ListContainer = styled.div`
    margin-top:50px;
    margin-bottom:50px;
    display:grid;
    grid-template-columns: repeat(4, 1fr);
`;

const FundingContainer = styled.div`
    margin: 5px 5px 5px 5px;
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	max-width:300px;
`;

const FundingImg = styled.img`
    width:100%;
    max-width:250px;
    height:auto;
    align-items:center
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
    return(

    <Container>
    <Menu>funding menubar</Menu>
			
    <ListContainer>					
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