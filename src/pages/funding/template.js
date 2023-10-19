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


export default function Template(){
    const router = useRouter();
    return(
    <Container>
        

    </Container>
        
    )

}