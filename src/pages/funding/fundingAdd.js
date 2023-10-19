import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Container = styled.div`
    display: flex;
    min-width:1280px;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    grid-template-columns: repeat(2, 1fr);
    white-space: pre-line;
`;


export default function FundingAdd(){
    return(
    <Container>
        <img src="/assets/images/auction/ac1.png"/>
        <br/>
        <div> 등록.. </div>

    </Container>
        
    )

}