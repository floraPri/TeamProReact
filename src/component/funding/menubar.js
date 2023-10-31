import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Container = styled.div`
    display: flex;
    min-width:1280px;
    margin-top: -10px;
    padding-left: 15px;
    padding-bottom: 10px;
    border-bottom : 1px solid #E7E7E7;
`;

const Move = styled.div`
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
              <NavDropdown.Divider />
              <NavDropdown.Item href="/funding/myFunding/myOrganizeList">
                올린 프로젝트
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/funding/myFunding/myPledges">
                후원 목록
              </NavDropdown.Item>
        </NavDropdown> &nbsp; &nbsp;

        <Move onClick={() => router.push('/funding/funding')}> ALL </Move>&nbsp;&nbsp;
        <Move onClick={() => router.push('/funding/funding')}> 문구 </Move>&nbsp;&nbsp;
        <Move onClick={() => router.push('/funding/funding')}> 출판 </Move>&nbsp;&nbsp;
        <Move onClick={() => router.push('/funding/funding')}> 게임 </Move>&nbsp;&nbsp;
        <Move onClick={() => router.push('/funding/funding')}> 리빙 </Move>&nbsp;&nbsp;
        <Move onClick={() => router.push('/funding/funding')}> 반려동물 </Move>&nbsp;&nbsp;


    </Container>
        
    )
}