import styled from "styled-components";
import {Table ,TableCell, TableRow, TableBody, TableHead, TableContainer} from "@mui/material";

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

export default function MySalesList(){
    return(
        <RightContainer>
            <h3>MemberID님의 판매 내역</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>판매코드</TableCell>
                        <TableCell>상품번호</TableCell>
                        <TableCell>판매일</TableCell>
                        <TableCell>수량</TableCell>
                        <TableCell>상품명</TableCell>
                        <TableCell>결제금액</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>5454</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>2023-01-01</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>팬톤 컬러 보조배터리</TableCell>
                        <TableCell>180000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5454</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>2023-01-01</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>팬톤 컬러 보조배터리</TableCell>
                        <TableCell>180000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5454</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>2023-01-01</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>팬톤 컬러 보조배터리</TableCell>
                        <TableCell>180000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5454</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>2023-01-01</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>팬톤 컬러 보조배터리</TableCell>
                        <TableCell>180000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5454</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>2023-01-01</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>팬톤 컬러 보조배터리</TableCell>
                        <TableCell>180000</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5454</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>2023-01-01</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>팬톤 컬러 보조배터리</TableCell>
                        <TableCell>180000</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </RightContainer>
    );
}