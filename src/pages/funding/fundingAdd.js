import styled from "styled-components";
import React, { useState } from "react";
import Menubar from "@/component/funding/menubar";
import { TableCell, TableRow, Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-bottom:30px;
    `;
    
const Title = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:600;
    margin-top:20px;
    margin-bottom:20px;
    padding: 10px 0px 6px 0px;
    border-bottom : 2px solid #03C179;
`;

const Input = styled.input`
    width: 500px;
    padding: 5px;
    margin: 0;
    font-size:12px;
`;

const Textarea = styled.textarea`
    width: 500px;
    padding: 5px;
    margin: 0;
    font-size:12px;
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
        precontent: '',
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
        formData.append("content",fundingData.content);
        formData.append("precontent",fundingData.precontent);
        formData.append("image",fundingData.image);
        formData.append("startdate",fundingData.startdate);
        formData.append("enddate",fundingData.enddate);
        formData.append("goalamount",fundingData.goalamount);
        formData.append("userno", userno);

        try {
            // 서버로 전송
            
            const response = await axios.post(`http://localhost:8081/funding/fundingAdd`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일 업로드에 대한 헤더 설정
                    Authorization: `Bearer ${(getAuthToken())}`
                }
            });
            console.log('insertdata ',fundingData);
            console.log(userno)

            if (response.status === 200) {
              console.log('success');
            //   console.log(response.data)
              router.push(`/funding/rewardAdd?fundingcode=${response.data.fundingcode}`);
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
        <Title> FUNDING ADD </Title>
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
                    <option value="stationery"> 문구 </option>
                    <option value="book"> 출판 </option>
                    <option value="game"> 게임 </option>
                    <option value="living"> 리빙 </option>
                    <option value="pet"> 반려동물 </option>
                </select>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> 펀딩 제목 </TableCell>
                <TableCell>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        value={fundingData.title}
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
                <TableCell> 상세 내용 </TableCell>
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
                <TableCell> 요약 내용 </TableCell>
                <TableCell>
                    <Textarea
                        id="precontent"
                        name="precontent"
                        value={fundingData.precontent}
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
                <TableCell> 목표금액 </TableCell>
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
                    <Button active="true" type="submit"> 등록 </Button>
                </TableCell>
            </TableRow>
            </tbody>
        </table>
        
        </form>

    </Container>
        
    )
}