import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
    display: flex;
    min-width:1280px;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    grid-template-columns: repeat(2, 1fr);
    white-space: pre-line;
`;

const Btn = styled.div`
    width:40px;
    background:rgba(231,231,231, 0.6)
`;

export default function FundingDetail(){
    const router = useRouter();

    return(
    <Container>
        <img src="/assets/images/auction/ac1.png"/>
        <br/>
        <div> tq.. <br/>
        <Btn onClick={() => router.push('/funding/fundingEdit')}>수~정~</Btn><br/>
        <Btn onClick={() => router.push('/funding/fundingAdd')}>등~록~</Btn><br/>
        <Btn onClick={() => router.push('/funding/funding')}>목록</Btn><br/>
        </div>

    </Container>
        
    )

}