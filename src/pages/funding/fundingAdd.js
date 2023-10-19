import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Menubar from "@/component/funding/menubar";

const Container = styled.div`
    display: grid;
    justify-content: center;
    white-space: pre-line;
    font-size:12px;
`;


export default function FundingAdd(){
    return(
    <Container>
        <Menubar/>
        <img src="/assets/images/auction/ac1.png"/>
        <br/>
        <div> 등록.. </div>

    </Container>
        
    )

}