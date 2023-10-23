import styled from "styled-components";
import React, { useState } from "react";
import Menubar from "@/component/funding/menubar";
import { TableCell, TableRow, Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";

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
  };
  
export default function FundingAdd(){

    const router = useRouter();

    const [fundingData, setFundingData] = useState({
        category: '',
        title: '',
        content: '',
        image: null,
        startdate: null,
        enddate: null,
        goalamount: 0,
      });
      
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFundingData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userno = localStorage.getItem('userno');
        const formData = new FormData();
        formData.append("category",fundingData.category);
        formData.append("title",fundingData.title);
        formData.append("subtitle",fundingData.subtitle);
        formData.append("content",fundingData.content);
        formData.append("subcontent",fundingData.subcontent);
        formData.append("image",fundingData.image);
        formData.append("startdate",fundingData.startdate);
        formData.append("enddate",fundingData.enddate);
        formData.append("goalamount",fundingData.goalamount);
        formData.append("userno",userno);

        try {
            // 서버로 전송
            
            const response = await axios.post('http://localhost:8081/funding/fundingEdit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일 업로드에 대한 헤더 설정
                    Authorization: `Bearer ${(getAuthToken())}`
                }
            });
            console.log('insertdata ',fundingData);
            console.log(userno)

            if (response.status === 200) {
              console.log('success');
              router.push('/funding/funding');
            } else {
              console.error('failed');
            }
          } catch (error) {
            console.error('error:', error);
          }
        };

    return(
    <Container>
        <Menubar/>
        <Title> FUNDING EDIT </Title>
        <form onSubmit={handleSubmit}>
        <table>
            <tbody>
            <TableRow>
                <TableCell> 카테고리 </TableCell>
                <TableCell>

                    <select
                    id="category"
                    name="category"
                    value={fundingData.category}
                    onChange={handleChange}
                    >
                    <option value=""> 카테고리 </option>
                    <option value="A"> 문구 </option>
                    <option value="B"> 출판 </option>
                    <option value="C"> 게임 </option>
                    <option value="D"> 리빙 </option>
                    <option value="E"> 반려동물 </option>

                    </select>


                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> 전체 타이틀(긴 제목) </TableCell>
                <TableCell>
                    <FileInput
                    type="text"
                    id="title"
                    name="title"
                    value={fundingData.title}
                    onChange={handleChange}
                    />
                    </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> 목록에서 보일 제목 </TableCell>
                <TableCell>
                    <FileInput
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={fundingData.subtitle}
                    onChange={handleChange}
                    />
                    </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> 이미지 </TableCell>
                <TableCell>
                <Input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*" 
                    onChange={handleChange}
                    />
                </TableCell>    
            </TableRow>
            <TableRow>
                <TableCell> 본문 </TableCell>
                <TableCell>
                <Textarea
                    id="content"
                    name="content"
                    value={fundingData.content}
                    onChange={handleChange}
                    />
            </TableCell>
            </TableRow>    
            <TableRow>
                <TableCell> 목록에서 보일 본문 요약내용 </TableCell>
                <TableCell>
                <Textarea
                    id="subcontent"
                    name="subcontent"
                    value={fundingData.subcontent}
                    onChange={handleChange}
                    />
            </TableCell>    
            </TableRow>
            <TableRow>
                <TableCell> 시작일 </TableCell>
                <TableCell>
                <Input
                    type="Date"
                    id="startdate"
                    name="startdate"
                    value={fundingData.startdate}
                    onChange={handleChange}
                    />    
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> 마감일 </TableCell>
                <TableCell>
                <Input
                    type="Date"
                    id="enddate"
                    name="enddate"
                    value={fundingData.enddate}
                    onChange={handleChange}
                    />    
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> 목표 금액 </TableCell>
                <TableCell>
                <Input
                    type="number"
                    id="goalamount"
                    name="goalamount"
                    value={fundingData.goalamount}
                    onChange={handleChange}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={cellStyle}></TableCell>
                <TableCell sx={cellStyle} align="right">
                    <Button active="true" type="submit"> 수정 </Button>
                </TableCell>
            </TableRow>
            </tbody>
        </table>
        
        </form>

    </Container>
        
    )
}