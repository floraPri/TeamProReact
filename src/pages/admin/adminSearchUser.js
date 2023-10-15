import styled from "styled-components";
import MyLeftMenu from "@/component/admin/myLeftMenu";
import {Table, TableHead, TableCell, TableRow, TableBody, Button} from "@mui/material";

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

const CellButton  = styled(Button)`
  background-color: #D9D9D9;
  color: black;
  font-weight: bold;
`;

export default function AdminSearchUser (){
    return(
      <Container>
        <MyLeftMenu />
        <Main>
          <SearchBoxContainer>
            <SearchBox>
              검색어
              <SearchBoxSelect>회원번호</SearchBoxSelect>
              <SearchBar>
                <SearchInput></SearchInput>
              </SearchBar>
              <SearchButton type="submit">검색하기</SearchButton>
            </SearchBox>
          </SearchBoxContainer>
          <SearchResultText>검색결과</SearchResultText>
          <SearchResultContainer>
            <StyledTable >
              <StyledTableHead>
                <TableRow>
                  <TableCellTitle>UserNumber</TableCellTitle>
                  <TableCellTitle>Email</TableCellTitle>
                  <TableCellTitle>Name</TableCellTitle>
                  <TableCellTitle>PhoneNumber</TableCellTitle>
                  <TableCellTitle>JoinDate</TableCellTitle>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                <TableRow>
                  <TableCellContent>32</TableCellContent>
                  <TableCellContent>xxx@gmail.com</TableCellContent>
                  <TableCellContent>Sam Smith</TableCellContent>
                  <TableCellContent>010-6425-4455</TableCellContent>
                  <TableCellContent>2023.08.17</TableCellContent>
                  <TableCellContent><CellButton type="submit">채팅</CellButton></TableCellContent>
                  <TableCellContent><CellButton type="submit">정지</CellButton></TableCellContent>
                </TableRow>
              </TableBody>
            </StyledTable >
          </SearchResultContainer>
        </Main>
      </Container>
    )
}