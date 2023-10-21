import styled from "styled-components";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Menubar from "@/component/funding/menubar";
import { TableCell, TableRow, Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

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
  
export default function FundingEdit(){
    const router = useRouter();

    const { fundingcode } = router.query;

    const [fundingData, setFundingData] = useState({
        category: '',
        title: '',
        content: '',
        image: null,
        startdate: null,
        enddate: null,
        goalamount: 0,
      });

      useEffect(() => {
        axios.get(`http://localhost:8081/funding/fundingEdit`, {
          params: {
            fundingcode: fundingcode,
          }
        })
          .then((response) => {
            const data = response.data;
            setAuctionData({
              category: data.category,  
              title: data.title,
              content: data.content,
              image: data.image,
              startdate: data.startdate,
              enddate: data.enddate,
              goalamount: data.goalamount
            });
          })
          .catch((error) => {
            console.error('error', error);
          });
      }, [fundingcode]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFundingData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("category",fundingData.category);
        formData.append("title",fundingData.title);
        formData.append("content",fundingData.content);
        formData.append("image",fundingData.image);
        formData.append("startdate",fundingData.startdate);
        formData.append("enddate",fundingData.enddate);
        formData.append("goalamount",fundingData.goalamount);

        try {
            // 서버로 전송
            const response = await axios.post('http://localhost:8081/funding/fundingAdd', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // 파일 업로드에 대한 헤더 설정
                }
            });
            console.log('insertdata ',fundingData);

            if (response.status === 200) {
              console.log('success');
              router.push('/funding/fundingAdd');
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
        <Title> FUNDING Edit </Title>
        <form onSubmit={handleSubmit}>
        <table>
            <tbody>
            <TableRow>
                <TableCell> 카테고리 </TableCell>
                <TableCell>
                    <Input
                    type="text"
                    id="category"
                    name="category"
                    value={fundingData.category}
                    onChange={handleChange}
                    />
                    </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> 제목 </TableCell>
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
                    <Button active type="submit"> 등록 </Button>
                </TableCell>
            </TableRow>
            </tbody>
        </table>
        
        </form>

    </Container>
        
    )
}