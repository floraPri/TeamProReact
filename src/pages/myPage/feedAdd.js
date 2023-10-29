import styled from "styled-components";
import * as React from 'react';
import {Table ,TableCell, TableRow, TableBody, Button, TableContainer} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";
import { useRouter } from "next/router";

const Container = styled.div`
    display: grid;
    justify-content: center;
    white-space: pre-line;
    font-size:12px;
    margin: 10px;
    width:100%;
`;

const Title = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:600;
    margin:5px;
    padding: 20px;
    border-bottom : 1px solid #E7E7E7;
`;

const Input = styled.input`
  width: 500px;
  padding: 5px;
  margin: 0;
`;

const Textarea = styled.textarea`
  width: 500px;
  padding: 5px;
  margin: 0;
`;

const FileInput = styled.input`
`;

const cellStyle = {
    border: 'none',
    align: 'center', 
  };

function getUserNoFromLocalStorage(){
    const userno = localStorage.getItem("userno");
    return userno;
}

//피드 등록
export default function MyFeedAdd(){
    const router = useRouter();

    const [feedData, setFeedData] = useState({
        title : "",
        content: "",
        image: null,
        userno: "",
    });

    const onChange = (e) => {
        const { name, value, type, files } = e.target;
        setFeedData((prevData) => ({
            ...prevData,
      [name]: type === "file" ? files[0] : value,
        }));
    };

    // 등록버튼 누르면 등록
    const save = async (e) => {
        e.preventDefault();        
        const userno = getUserNoFromLocalStorage();

        const formData = new FormData();
        formData.append("image", feedData.image);
        formData.append("title", feedData.title);
        formData.append("content", feedData.content);
        formData.append("userno",userno);
        console.log(feedData.image);
        console.log(feedData.title);
        console.log(feedData.content);
        console.log("userno: "+ userno);

        try {
            const response = await axios.post(`http://localhost:8081/myPage/feedAdd`, formData, {
                headers: {
                    Authorization : `Bearer ${(getAuthToken())}`,
                    'Content-Type': 'multipart/form-data', // 파일 업로드에 대한 헤더 설정
                }
            });

            if(response.status === 200){
                console.log('피드 데이터가 성공적으로 저장되었습니다.');
                router.push('/myPage/myp');
            } else {
                console.error('저장 오류 발생')
            }
        } catch(error){
            console.error('상품 등록 에러 : ', error)
        }
    };

    return(
    <Container>
        <Title> 피드 등록하기 </Title>
        <form encType="multipart/form-data" onSubmit={save}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell>
                            <Input 
                                type="text" 
                                id="title" 
                                name="title"
                                onChange={onChange} 
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>내용</TableCell>
                        <TableCell>
                            <Textarea 
                                id="content" 
                                name="content"
                                onChange={onChange}
                            /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>이미지</TableCell>
                        <TableCell>
                            <Input 
                                type="file" 
                                id="image" 
                                name="image"
                                accept="image/*"
                                onChange={onChange} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={cellStyle}></TableCell>
                        <TableCell sx={cellStyle} align="center">
                            <Button active="true" type="submit"> 피드 등록 </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </form>
    </Container>
    );
}