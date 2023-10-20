import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import Link from "next/link";
import Image from "next/image";
import * as React from 'react';
import {Table ,TableCell, TableRow, TableBody, TableHead, TableContainer} from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";


const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;


const Fl = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

export default function Cart (){
    const [email,setEmail] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem('email');

        if(userEmail){
            setEmail(userEmail);
        }
    },[]);

    return(
      <Container>
        <MyPagesMenu />
        <RightContainer>
            <h3>{email}님의 찜하기 상품</h3>
            <TableContainer>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>순번</TableCell>
                          <TableCell>이미지</TableCell>
                          <TableCell>상품명</TableCell>
                          <TableCell>수량</TableCell>
                          <TableCell>금액</TableCell>
                          <TableCell>버튼</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                          <TableCell><Link href="">소싱360도 썬히터 감성 야외 가정용 캠핑 발 히터 사무실 탄소 전기 난로 스토브</Link></TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>25000</TableCell>
                          <TableCell> <MdDeleteForever size="20" /> </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                          <TableCell><Link href="">소싱360도 썬히터 감성 야외 가정용 캠핑 발 히터 사무실 탄소 전기 난로 스토브</Link></TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>25000</TableCell>
                          <TableCell> <MdDeleteForever size="20" /> </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell>3</TableCell>
                          <TableCell><Image src="/assets/images/mypage/thumb_img2.jpg" width="50" height="50" /></TableCell>
                          <TableCell><Link href="">소싱360도 썬히터 감성 야외 가정용 캠핑 발 히터 사무실 탄소 전기 난로 스토브</Link></TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>25000</TableCell>
                          <TableCell> <MdDeleteForever size="20" /> </TableCell>
                      </TableRow>
                  </TableBody>
              </Table>
            </TableContainer>
        </RightContainer>
      </Container>
    )
}