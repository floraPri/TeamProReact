import { Righteous } from "next/font/google";
import styled from "styled-components";
import { BiSearch,  BiSolidUserCircle } from "react-icons/bi";
import { GrUserAdmin  } from "react-icons/gr";
import { useRouter } from "next/router";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { request } from "../user/axios_helper";

export default function Header() {
    const router = useRouter();
    const [hasNotification] = useState(true);
    const [search, setSearch] = useState('');
    const [authority, setAuthority] = useState(null);
    const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('auth_token');
    console.log(tokenFromLocalStorage);
    setToken(tokenFromLocalStorage);
    setAuthority(localStorage.getItem('authority'));
  }, [])

    const searchHandler = (e) =>{
        e.preventDefault();
        console.log("submit동작");
        router.push(`/search/${search}`);
    }
  
  // 필드의 업데이트된 값을 state에 저장
  const onChangeHandler = (event) => {
      setSearch(event.target.value);
      console.log(search);
  };
    
    const handleLogout = () => {
        request(
          "POST",
          "/logout/",
          {
            Authorization: `Bearer ${token}`
          }
        ).then((response) => {
            if (response.status === 200) {
              // 로그아웃 성공
              localStorage.removeItem('auth_token');
              localStorage.removeItem('joindate');
              localStorage.removeItem('userno');
              localStorage.removeItem('email');
              localStorage.removeItem('name');
              localStorage.removeItem('phone');
              localStorage.removeItem('address');
              localStorage.removeItem('authority');
              window.location.href = '/'; 
            } else {
              // 로그아웃 실패
              console.error('로그아웃 실패');
            }
          })
          .catch((error) => {
            console.error('로그아웃 요청 중 오류 발생', error);
          });
      };

    return(
        
        <Container>
            <ContainerIn>
                <Title onClick={() => router.push('/main/main') }>weAround</Title>
                <LeftMenu>
                    <LeftMenuTab onClick={() => router.push('/auction/auction') }>경매</LeftMenuTab>
                    <LeftMenuTab onClick={() => router.push('/funding/funding') }>펀딩</LeftMenuTab>
                </LeftMenu>
                <SearchBar>
                    <SearchForm onSubmit={searchHandler}>
                    <SearchIcon type="submit" ><BiSearch style={{width:'20px',height:'20px'}} /></SearchIcon>
                        <SearchInput type="text" name="search" onChange={onChangeHandler} value={search}/>
                    </SearchForm>
                </SearchBar>
                <RightMenu>
                    {authority === "ROLE_ADMIN" && (
                        <RightMenuTab>
                            <StyledDropdown>
                                <StyledDropdownToggle  variant="white">
                                    <GrUserAdmin style={{width:'30px',height:'30px'}}/>
                                </StyledDropdownToggle >
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => router.push('/admin/adminHome') }>관리자페이지</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                                </Dropdown.Menu>
                            </StyledDropdown>
                        </RightMenuTab>
                    )}
                    {authority == "ROLE_USER" && (
                        <RightMenuTab>
                            <StyledDropdown>
                                <StyledDropdownToggle  variant="white">
                                    <BiSolidUserCircle style={{width:'30px',height:'30px'}}/>
                                </StyledDropdownToggle >
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => router.push('/myPage/myp') }>마이페이지</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                                </Dropdown.Menu>
                            </StyledDropdown>
                        </RightMenuTab>
                    )}
                    {authority == null && (
                        <RightMenuTab>
                            <StyledDropdown>
                                <></>
                            </StyledDropdown>
                        </RightMenuTab>
                    )}
                    <RightMenuTab onClick={() => router.push('/csCenter/csCenter') }>고객센터</RightMenuTab>
                    <RightMenuTab>
                        <Dropdown>
                            <StyledDropdownToggle variant="success">
                                글쓰기
                            </StyledDropdownToggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/myPage/feedAdd">피드</Dropdown.Item>
                                <Dropdown.Item href="/funding/fundingAdd">펀딩</Dropdown.Item>
                                <Dropdown.Item href="/auction/auctionAdd">경매</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </RightMenuTab>
                </RightMenu>
            </ContainerIn>
        </Container>
    )
}

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
    position: fixed;
    top: 0;
    z-index: 5;
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
    width: 170px; 
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
        color: #03C179;
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

const SearchForm = styled.form`
    display: flex;
    align-items: center;
`;

const SearchIcon = styled.button`
    padding: 0px 0px 2px 5px;
    color: #8b8b8b;
    border: none;
    background-color: white;
    &:hover {
        color: #03C179;
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
        color: #03C179;
    }
`;

const StyledDropdown = styled(Dropdown)`
    .dropdown-toggle::after {
        content: none;
    }
    margin-top: -5px;
`;

const StyledDropdownToggle  = styled(Dropdown.Toggle)` 
    border: none;
`;

const RedDot = styled.div`
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: -5;
  right: 0;
`;