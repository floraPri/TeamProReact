import { Righteous } from "next/font/google";
import Link from "next/link";
import styled from "styled-components";
import { BiSearch, BiMessageAlt } from "react-icons/bi";
import { BsBell } from "react-icons/bs";

const Container = styled.div`
    width: 100%; 
    height: 100px; 
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    padding : 10px 88px;
    border : 1px solid #E7E7E7;
`;
const ContainerIn = styled.div`
    width: 1280px; 
    min-width: 1280px; 
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    color: black;
    font-size: 24px;
    font-family: Inter;
    font-weight: 900;
    word-wrap: break-word;
    cursor:pointer;
`;

const LeftMenu = styled.div`
    display: flex;
    /* width: 206px; */
    width: 300px;
    justify-content: space-between
`;

const LeftMenuTab = styled.div`
    color: black;
    font-size: 20px;
    font-family: Inter;
    font-weight: 600;
    word-wrap: break-word;
    cursor: pointer;
    &:hover {
        color: #1877F2;
    }
`;

const SearchBar = styled.div`
    width: 370px;
    height: 42px;
    border: 1px solid #D7D7D7;
    border-radius: 5px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    

`;

const SearchIcon = styled.div`
    padding: 5px;
    cursor: pointer;
    &:hover {
        color: #1877F2;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
`;

const RightMenu = styled.div`
    display: flex;
    justify-content: space-between;
    color: black;
    font-size: 16px;
    font-family: Inter;
    font-weight: 400;
    word-wrap: break-word;
    /* width: 350px; */
    width: 400px;
`;

const RightMenuIcon = styled.div`
    cursor: pointer;
    &:hover {
        color: #1877F2;
    }
`;

const RightMenuTab = styled.div`
    cursor: pointer;
    &:hover {
        color: #1877F2;
    }
`;


export default function Header(){
    return(
        <Container>
            <ContainerIn>
                <Title><Link href="/main/main">weAround</Link></Title>
                <LeftMenu>
                    <LeftMenuTab><Link href="/channel/commain">커뮤니티</Link></LeftMenuTab>
                    <LeftMenuTab>채널</LeftMenuTab>
                    <LeftMenuTab><Link href="/product/product">새상품</Link></LeftMenuTab>
                    <LeftMenuTab><Link href="/auction/auction">경매</Link></LeftMenuTab>
                </LeftMenu>
                <SearchBar>
                    <SearchIcon><BiSearch /></SearchIcon>
                    <SearchInput></SearchInput>
                </SearchBar>
                <RightMenu>
                    <RightMenuIcon><Link href="/message/messageList"><BiMessageAlt /></Link></RightMenuIcon>
                    <RightMenuIcon><BsBell /></RightMenuIcon>
                    <RightMenuTab>내채널</RightMenuTab>
                    <RightMenuTab><Link href="/myPage/myp">마이페이지</Link></RightMenuTab>
                    <RightMenuTab><Link href="/admin/csCenter">고객센터</Link></RightMenuTab>
                    <RightMenuTab><Link href="/user/login/login">로그인</Link></RightMenuTab>
                </RightMenu>
            </ContainerIn>
        </Container>
    )
}