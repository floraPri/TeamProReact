import styled from "styled-components";
import Image from "next/image";
import * as React from 'react';
import {Table ,TableCell, TableRow, TableBody, TableHead, TableContainer} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

export default function MyProductList(){
    return(
        <RightContainer>
            <h3>MemberID 님이 등록한 상품</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>상품번호</TableCell>
                        <TableCell>상품이미지</TableCell>
                        <TableCell>상품명</TableCell>
                        <TableCell>판매가능수량</TableCell>
                        <TableCell>판매가</TableCell>
                        <TableCell>수정</TableCell>
                        <TableCell>삭제</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                        <TableCell>소싱360도 썬히터 감성 야외 가정용 캠핑 탄소 전기 난로 스토브</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>50000</TableCell>
                        <TableCell><BiSolidPencil size="20" /></TableCell>
                        <TableCell><MdDelete size="20" /></TableCell>                            
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                        <TableCell>소싱360도 썬히터 감성 야외 가정용 캠핑 탄소 전기 난로 스토브</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>50000</TableCell>
                        <TableCell><BiSolidPencil size="20" /></TableCell>
                        <TableCell><MdDelete size="20" /></TableCell>                            
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                        <TableCell>소싱360도 썬히터 감성 야외 가정용 캠핑 탄소 전기 난로 스토브</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>50000</TableCell>
                        <TableCell><BiSolidPencil size="20" /></TableCell>
                        <TableCell><MdDelete size="20" /></TableCell>                            
                    </TableRow>
                </TableBody>

            </Table>
        </RightContainer>
    );
}