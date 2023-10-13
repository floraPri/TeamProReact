import Link from "next/link";
import Image from "next/image";
import * as React from 'react';
import styled from "styled-components";
import {Table ,TableCell, TableRow, TableBody, TableHead, TableContainer} from "@mui/material";
import { MdDeleteForever } from "react-icons/md";

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

export default function CartListPage(){
    return(
        <RightContainer>
            <h3>찜하기 상품</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>순번</TableCell>
                        <TableCell>이미지</TableCell>
                        <TableCell>수량</TableCell>
                        <TableCell>상품명</TableCell>
                        <TableCell>금액</TableCell>
                        <TableCell>버튼</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                        <TableCell>1</TableCell>
                        <TableCell><Link href="">소싱360도 썬히터 감성 야외 가정용 캠핑 발 히터 사무실 탄소 전기 난로 스토브</Link></TableCell>
                        <TableCell>25000</TableCell>
                        <TableCell> <MdDeleteForever size="20" /> </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                        <TableCell>1</TableCell>
                        <TableCell><Link href="">소싱360도 썬히터 감성 야외 가정용 캠핑 발 히터 사무실 탄소 전기 난로 스토브</Link></TableCell>
                        <TableCell>25000</TableCell>
                        <TableCell> <MdDeleteForever size="20" /> </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                        <TableCell>1</TableCell>
                        <TableCell><Link href="">소싱360도 썬히터 감성 야외 가정용 캠핑 발 히터 사무실 탄소 전기 난로 스토브</Link></TableCell>
                        <TableCell>25000</TableCell>
                        <TableCell> <MdDeleteForever size="20" /> </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </RightContainer>
    );
}