import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const Container = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    grid-template-columns: repeat(2, 1fr);
    white-space: pre-line;
    max-width:400px;
`;


export default function Rewardslist(){
    const router = useRouter();
    return(
    <Container>
        야호.. 대출금을 모두 갚지 못했어~
        

    </Container>
        
    )

}