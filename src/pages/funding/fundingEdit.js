import styled from "styled-components";
import React, { useState, useEffect } from "react";
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
  
export default function FundingEdit(){

    const router = useRouter();
    const { fundingcode } = router.query;
    const [nowamount, setNowAmount] = useState('')
    const [img, setImg] = useState('');
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

    
      useEffect(
        () => {
        axios.get(`http://localhost:8081/funding/fundingEdit`, {
          params: {
            fundingcode: fundingcode,
          },
          headers: {
            'Content-Type': 'multipart/form-data', // 파일 업로드에 대한 헤더 설정
            Authorization: `Bearer ${(getAuthToken())}`
        }
        })
          .then((response) => {
            const data = response.data;
            const startDateStr = formatDate(new Date(parseInt(data.startdate)));
            const endDateStr = formatDate(new Date(parseInt(data.enddate)));
            setImg(data.image);
            setNowAmount(data.nowamount);
            setFundingData({
                category: data.category,
                title: data.title,
                content: data.content,
                precontent: data.precontent,
                image: data.image,
                startdate: startDateStr,
                enddate: endDateStr,
                // nowamount: data.nowamount,
                goalamount: data.goalamount,
            });
            // console.log("set img address :"+ img);
            console.log(nowamount);
          })
          .catch((error) => {
            console.error('loading error:', error);
          });
      }, [fundingcode]);  

      
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };


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

        formData.append("fundingcode",fundingcode);
        formData.append("category",fundingData.category);
        formData.append("title",fundingData.title);
        formData.append("content",fundingData.content);
        formData.append("precontent",fundingData.precontent);

        if (fundingData.image !== null) {
            formData.append("image", fundingData.image);
        } else {
            formData.append("image", img); // 기존 이미지 주소를 formData에 추가
        }
        
        formData.append("startdate",fundingData.startdate);
        formData.append("enddate",fundingData.enddate);
        console.log("nowamount: " + nowamount)
        formData.append("nowamount",nowamount);
        formData.append("goalamount",fundingData.goalamount);
        formData.append("userno", userno);
    

        try {
            // 서버로 전송
            
            const response = await axios.post(`http://localhost:8081/funding/fundingEdit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일 업로드에 대한 헤더 설정
                    Authorization: `Bearer ${(getAuthToken())}`
                }
            });
            console.log('updatedata ', fundingData);
            console.log('nowamount value : ' + nowamount)

            if (response.status === 200) {
              console.log('success');
              alert('수정이 완료되었습니다');
              router.push(`/funding/fundingDetail?fundingcode=${fundingcode}`);
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
                <TableCell colSpan={2}>

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
                <TableCell> title </TableCell>
                <TableCell colSpan={2}>
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
                <TableCell>
                    이미지
                </TableCell>
                <TableCell>
                    {fundingData.image && <img src={fundingData.image} alt="Funding Image" style={{ width: '100px', height: '100px' }} />}
                </TableCell>
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
                <TableCell> content </TableCell>
                <TableCell colSpan={2}>
                <Textarea
                    id="content"
                    name="content"
                    value={fundingData.content}
                    onChange={handleChange}
                    />
            </TableCell>
            </TableRow>    
            <TableRow>
                <TableCell> precontent </TableCell>
                <TableCell colSpan={2}>
                <Textarea
                    id="precontent"
                    name="precontent"
                    value={fundingData.precontent}
                    onChange={handleChange}
                    />
            </TableCell>    
            </TableRow>
            <TableRow>
                {/* 시작일 수정불가 */}
                <TableCell> start </TableCell> 
                <TableCell colSpan={2}>
                <Input
                    type="Date"
                    id="startdate"
                    name="startdate"
                    value={fundingData.startdate}
                    onChange={handleChange}
                    readOnly
                    />    
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell> end </TableCell>
                <TableCell colSpan={2}>
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
                <TableCell> goalamount </TableCell>
                <TableCell colSpan={2}>
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
                <TableCell sx={cellStyle} align="right" colSpan={2}>
                    <Button active="true" type="submit"> 등록 </Button>
                </TableCell>
            </TableRow>
            </tbody>
        </table>
        
        </form>

    </Container>
        
    )
}