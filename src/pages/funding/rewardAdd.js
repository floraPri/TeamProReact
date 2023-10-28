import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthToken } from "@/component/user/axios_helper";
import { TableCell, TableRow, Button } from "@mui/material";


const Container = styled.div`
    display: flex;
    min-width:1280px;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    grid-template-columns: repeat(2, 1fr);
    white-space: pre-line;
`;

const Container2 = styled.div`

`;
const AddContainer = styled.div`

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
  border: none;
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

export default function RewardAdd(){
    const router = useRouter();
    const { fundingcode } = router.query;

    const [rewardData, setRewardData] = useState({
        price: 0,
        title: '',
        content: '',
        delivery: null,
      });
      
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setRewardData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fundingcode", fundingcode);
        formData.append("price",rewardData.price);
        formData.append("title",rewardData.title);
        formData.append("content",rewardData.content);
        formData.append("delivery",rewardData.delivery);
        
        try {
            // 서버로 전송
            
            const response = await axios.post(`http://localhost:8081/funding/rewardAdd`, formData, {
                headers: {
                    Authorization: `Bearer ${(getAuthToken())}`
                }
            });
            console.log('insertdata ',rewardData);

            if (response.status === 200) {
              console.log('success');
              router.push(`/funding/rewardAdd?fundingcode=${fundingcode}`);
              alert('등록 성공');
            } else {
              console.error('failed');
            }
          } catch (error) {
            console.error('error:', error);
          }
        };

    return(
    <Container>
        <Container2>
            <AddContainer>
                <Title> REWARD ADD </Title>
                <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <TableRow>
                            <TableCell> 가격 </TableCell>
                            <TableCell>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                value={rewardData.price}
                                onChange={handleChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 제목 </TableCell>
                            <TableCell>
                                <Input
                                type="text"
                                id="title"
                                name="title"
                                value={rewardData.title}
                                onChange={handleChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 선물 목록 </TableCell>
                            <TableCell>
                                <Textarea
                                id="content"
                                name="content"
                                value={rewardData.content}
                                onChange={handleChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 배송 예정일 </TableCell>
                            <TableCell>
                                <Input
                                    type="Date"
                                    id="delivery"
                                    name="delivery"
                                    value={rewardData.delivery}
                                    onChange={handleChange}
                                />    
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={cellStyle}></TableCell>
                            <TableCell sx={cellStyle} align="right">
                            <Button active="true" type="submit"> reward 등록 </Button>
                            <Button onClick={() => router.push(`/funding/fundingDetail?fundingcode=${fundingcode}`)}> 등록 종료 </Button>
                            </TableCell>
                        </TableRow>
                    </tbody>
                    </table>
                </form>

            </AddContainer>
        </Container2>
    </Container>
        
    )

}