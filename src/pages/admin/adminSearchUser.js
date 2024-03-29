import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyLeftMenu from "@/component/admin/myLeftMenu";
import {Table, TableHead, TableCell, TableRow, TableBody, Button} from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/router';
import { getAuthToken } from "@/component/user/axios_helper";


const Container = styled.div`
  width: 1280px;
  height: 100%;
  display: flex;
  margin: 0 auto;
`;

const Main = styled.div`
  margin-left: 50px;
  margin-top: 30px;
  width: 100%;
  align-items: center;
`;

const SearchBoxContainer = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  width: 800px;
  height: 80px;
  border: none;
  background-color: #D9D9D9;
  align-items: center;
  display: flex;
  justify-content: center;
  font-weight: bold;
`;

const SearchBoxSelect = styled.div`
  margin-left: 30px;
  width: 100px;
  height: 40px;
  border: none;
  background-color: #FFF;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #CFCBCB;
`;

const SearchBar = styled.div`
  width: 400px;
  height: 42px;
  border: 1px solid #D7D7D7;
  padding: 0px 10px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  padding-left: 10px;
`;

const SearchButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: #FFF;
  font-weight: bold;
`;

const SearchResultText = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  font-size: 20px;
  font-weight: bold;
`;

const SearchResultContainer = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTable  = styled(Table)`
  margin-top: 50px;
  width: 1000px;
`;

const StyledTableHead  = styled(TableHead)`
  background-color: #D9D9D9;
`;

const TableCellTitle  = styled(TableCell)`
  width: 160px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

const TableCellContent  = styled(TableCell)`
  font-size: 16px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: #D9D9D9;
  color: black;
  font-weight: bold;
`;

export default function AdminSearchUser (){

  const [userno, setUserno] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [joindate, setJoindate] = useState('')
  const [enabled, setEnabled] = useState('')
  const [searchValue, setSearchValue] = useState(''); // 추가: 검색어 상태
  const [showResult, setShowResult] = useState(false); // 검색 결과를 나타내는 상태
  const router = useRouter();
  
  useEffect(() => {
    // 페이지가 로드될 때 userNo 파라미터를 확인하고 데이터를 가져오는 로직을 수행
    const { userno } = router.query;

    if (userno) {
      handleSearch(userno);
    }
  }, [router.query.userno]);

  function formatDate(epochTime) {
    const date = new Date(epochTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleSearch = () => {
    console.log("시작")
    console.log(searchValue)
    axios.get(`http://localhost:8081/admin/adminSearchUser?userno=${searchValue}`,{
      headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    }})
      .then(response => {
        
        console.log("axios");
        setUserno(response.data.userno);
        setEmail(response.data.email);
        setName(response.data.name);
        setPhone(response.data.phone);
        const formattedJoinDate = formatDate(response.data.joindate);
        setJoindate(formattedJoinDate); // 변환된 날짜를 상태에 업데이트
        setEnabled(response.data.enabled);
        setShowResult(true); // 검색 결과가 있을 때 상태 업데이트
      })
      .catch(error => {
        console.log(error);
        alert("존재하지 않는 회원번호")
        setShowResult(false); // 검색 결과가 없을 때 상태 업데이트
      });
  };
  
  // 유저 밴
  const handleBan = () => {
    console.log("유저 밴")
    console.log(userno)
    axios.put(`http://localhost:8081/admin/userBan`,{
      userno: userno,
      enabled: '1',
    }, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    }})
    
      .then(response => {
        console.log("axios");
        setUserno('');
        setEnabled('');
        setShowResult(false); // 검색 결과 감추기
        alert("정지 성공");
      })
      .catch(error => {
        alert("정지 실패");
        console.log(error);
      });
  };

  // 유저 릴리즈
  const handleRelease = () => {
    console.log("유저 릴리즈")
    axios.put(`http://localhost:8081/admin/userRelease`,{
      userno: userno,
      enabled: '0',
    },{
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
    }})
      .then(response => {
        console.log("axios");
        setUserno('');
        setEnabled('');
        setShowResult(false); // 검색 결과 감추기
        alert("해제 성공");
      })
      .catch(error => {
        alert("해제 실패");
        console.log(error);
      });
  };

  return(
    <Container>
      <MyLeftMenu />
      <Main>
        <SearchBoxContainer>
          <SearchBox>
            검색어
            <SearchBoxSelect>회원번호</SearchBoxSelect>
            <SearchBar>
              <SearchInput
                value={searchValue} // 검색어 입력값
                onChange={(e) => setSearchValue(e.target.value)} // 검색어 변경 시 상태 업데이트
              />
            </SearchBar>
            <SearchButton type="button" onClick={handleSearch}>검색하기</SearchButton>
          </SearchBox>
        </SearchBoxContainer>
        <SearchResultText>검색결과</SearchResultText>
        {showResult && ( // showResult 상태가 true일 때만 결과를 렌더링
        <SearchResultContainer>
            <StyledTable>
              <StyledTableHead>
                <TableRow>
                  <TableCellTitle>UserNumber</TableCellTitle>
                  <TableCellTitle>Email</TableCellTitle>
                  <TableCellTitle>Name</TableCellTitle>
                  <TableCellTitle>PhoneNumber</TableCellTitle>
                  <TableCellTitle>JoinDate</TableCellTitle>
                  <TableCellTitle>state</TableCellTitle>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                <TableRow>
                  <TableCellContent>{userno}</TableCellContent>
                  <TableCellContent>{email}</TableCellContent>
                  <TableCellContent>{name}</TableCellContent>
                  <TableCellContent>{phone}</TableCellContent>
                  <TableCellContent>{joindate}</TableCellContent>
                  <TableCellContent>
                    {enabled === '0' ? "이용중" : enabled === '1' ? "정지" : ''}
                  </TableCellContent>
                  <TableCellContent>
                    <StyledButton type="button" onClick={enabled === '0' ? handleBan : handleRelease}>
                      {enabled === '0' ? '정지' : '해제'}
                    </StyledButton>
                  </TableCellContent>
                </TableRow>
              </TableBody>
            </StyledTable>
        </SearchResultContainer>
        )}
      </Main>
    </Container>
  )
}