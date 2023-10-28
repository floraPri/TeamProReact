import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Menubar from "@/component/funding/menubar";

const Container = styled.div`
    display: grid;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;

`;


export default function MyFunding(){
    const router = useRouter();

    return(
        <Container>
        <Menubar/>


    </Container>
        
    )

}