import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
    display: flex;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom : 1px solid #E7E7E7;
`;

const Btn = styled.div`
    font-size: 15px;
    font-weight: 600;
    width:40px;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;

export default function Menubar(){
    const router = useRouter();
    return(
    <Container>
        <Btn onClick={() => router.push('/funding/fundingEdit')}>수정</Btn>&nbsp;&nbsp;
        <Btn onClick={() => router.push('/funding/fundingAdd')}>등록</Btn>&nbsp;&nbsp;
        <Btn onClick={() => router.push('/funding/funding')}>목록</Btn>&nbsp;&nbsp;
    </Container>
        
    )
}