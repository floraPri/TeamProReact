import { Righteous } from "next/font/google";
import styled from "styled-components";
import { BiSearch, BiMessageAlt, BiSolidUserCircle } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { useRouter } from "next/router";


const Container = styled.div`
    width: 100%; 
    min-width: 1280px; 
    height: 80px; 
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-bottom : 1px solid #E7E7E7;
    padding-bottom: 10px;
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
    text-decoration-line:none;
`;

const LeftMenu = styled.div`
    display: flex;
    /* width: 206px; */
    width: 250px;
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
    padding: 5px 5px 2px 5px;
    cursor: pointer;
    &:hover {
        color: #1877F2;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    height: 90%;
    border: none;
    outline: none;
    padding-left: 10px;
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
    width: 300px;
`;


const RightMenuTab = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
        color: #1877F2;
    }
`;

export default function Header() {
    const router = useRouter();

    return(
        
        <Container>
            <ContainerIn>
                <Title onClick={() => router.push('/main/main') }>weAround</Title>
                <LeftMenu>
                <LeftMenuTab onClick={() => router.push('/channel/commain') }>커뮤니티</LeftMenuTab>
                    <LeftMenuTab onClick={() => router.push('/product/product') }>중고거래</LeftMenuTab>
                    <LeftMenuTab onClick={() => router.push('/auction/auction') }>경매</LeftMenuTab>
                </LeftMenu>
                <SearchBar>
                <SearchIcon><BiSearch style={{width:'20px',height:'20px'}} /></SearchIcon>
                    <SearchInput></SearchInput>
                </SearchBar>
                <RightMenu>
                    <RightMenuTab onClick={() => router.push('/myPage/mail') }><BiMessageAlt style={{width:'20px',height:'20px'}}/></RightMenuTab>
                    <RightMenuTab><BsBell style={{width:'20px',height:'20px'}}/></RightMenuTab>
                    <RightMenuTab onClick={() => router.push('/myPage/myp') }><BiSolidUserCircle style={{width:'30px',height:'30px'}}/></RightMenuTab>
                    <RightMenuTab onClick={() => router.push('/csCenter/csCenter') }>고객센터</RightMenuTab>
                    <RightMenuTab>글쓰기</RightMenuTab>
                </RightMenu>
            </ContainerIn>
        </Container>
    )
}