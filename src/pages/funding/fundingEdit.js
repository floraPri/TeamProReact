import styled from "styled-components";
import Link from "next/link";
import React, { useState } from "react";
import Menubar from "@/component/funding/menubar";
import { Table, TableCell, TableRow, Button } from "@mui/material";

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
    const [fundingData, setFundingData] = useState({
        category: '',
        title: '',
        content: '',
        image: null,
        startdate: 0,
        enddate: 0,
        goalamount: 0,
      });
      
      const handleChange = (e) => {
          const { name, value, type, files } = e.target;
          if (type === "file") {
              setFundingData({ ...fundingData, [name]: files[0] });
        } else {
            setFundingData({ ...fundingData, [name]: value });
        }
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
            const response = await fetch('/api/createFunding', {
              method: 'POST',
              body: JSON.formData,
            });
      
            if (response.status === 200) {
              console.log('success');
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
                    <Button active type="submit"> 수정 </Button>
                </TableCell>
            </TableRow>
            </tbody>
        </table>
        </form>

    </Container>
        
    )
}