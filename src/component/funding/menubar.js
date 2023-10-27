import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";
import NavDropdown from 'react-bootstrap/NavDropdown';

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
    width:auto;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;


export default function Menubar(){
    const router = useRouter();
    return(
    <Container>
        <NavDropdown title="My" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/funding/fundingAdd">add</NavDropdown.Item>
              <NavDropdown.Item href="/funding/fundingEdit">
                edit
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/funding/funding">
                delete
              </NavDropdown.Item>
              <NavDropdown.Item href="/funding/myFunding">
                내펀딩
              </NavDropdown.Item>
        </NavDropdown> &nbsp; &nbsp;

        <Btn onClick={() => router.push('/funding/funding')}> ALL </Btn>&nbsp;&nbsp;
        {/* <Btn onClick={() => router.push(`/funding/funding?category=living`)}> living </Btn>&nbsp;&nbsp; */}
        <Btn onClick={() => router.push('/funding/fundingAdd')}> category </Btn>&nbsp;&nbsp;
        <Btn onClick={() => router.push('/funding/fundingEdit')}> 최신 </Btn>&nbsp;&nbsp;
        {/* <Btn onClick={() => router.push('/funding/funding')}>목록</Btn>&nbsp;&nbsp; */}


    </Container>
        
    )
}