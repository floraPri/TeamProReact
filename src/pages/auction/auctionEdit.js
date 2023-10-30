import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { TableCell, TableRow, Button } from "@mui/material";
import axios from 'axios';
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


export default function AuctionEdit() {

  const router = useRouter();

  const { auctionno } = router.query;

  const [auctionData, setAuctionData] = useState({
    auctiontitle: '',
    auctioncontent: '',
    buynow: 0,
    startprice: 0,
    minbid: 0,
    image: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/auction/auctionEdit`, {
      params: {
        auctionno: auctionno,
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      }
    })
      .then((response) => {
        const data = response.data;
        setAuctionData({
          auctiontitle: data.auctiontitle,
          auctioncontent: data.auctioncontent,
          buynow: data.buynow,
          startprice: data.startprice,
          minbid: data.minbid,
          image: data.image,
        });
      })
      .catch((error) => {
        console.error('경매 정보를 불러오는 중 오류 발생:', error);
      });
  }, [auctionno]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setAuctionData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("auctionno", auctionno);
    formData.append("image", auctionData.image);
    formData.append("auctiontitle", auctionData.auctiontitle);
    formData.append("auctioncontent", auctionData.auctioncontent);
    formData.append("buynow", auctionData.buynow);
    formData.append("startprice", auctionData.startprice);
    formData.append("minbid", auctionData.minbid);
    console.log("img : "+auctionData.image);
    console.log(auctionData.auctiontitle);
    console.log(auctionData.auctioncontent);
    console.log(auctionData.buynow);
    console.log(auctionData.startprice);
    console.log(auctionData.minbid);
    console.log(auctionno);

    // 수정 업데이트
    try {
      const response = await axios.post('http://localhost:8081/auction/auctionEdit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getAuthToken()}`
        }
      });

      if (response.status === 200) {
        console.log('경매가 성공적으로 수정되었습니다.');
        router.push(`/auction/auctionDetail?auctionno=${auctionno}`);
      } else {
        console.error('경매 저장 중 오류 발생');
      }
    } catch (error) {
      console.error('경매 저장 중 오류 발생:', error);
    }
  };

  return (
    <Container>
      <Title> 경매 수정 HOST </Title>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <table>
              <tbody>
                <TableRow>
                  <TableCell> 경매 물품 </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      id="acuTitle"
                      name="auctiontitle"
                      value={auctionData.auctiontitle}
                      onChange={handleChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> 경매 이미지 </TableCell>
                  <TableCell>
                  <FileInput
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*" 
                    onChange={handleChange}
                   />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> 경매 내용 </TableCell>
                  <TableCell>
                    <Textarea
                      rows={3}
                      id="acuContent"
                      name="auctioncontent"
                      value={auctionData.auctioncontent}
                      onChange={handleChange}
                     />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> 즉시 구매가 </TableCell>
                  <TableCell>
                  <Input
                    type="number"
                    id="acuBuyNow"
                    name="buynow"
                    value={auctionData.buynow}
                    onChange={handleChange}
                  />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> 시작가 </TableCell>
                  <TableCell>
                  <Input
                    type="number"
                    id="acuStartPrice"
                    name="startprice"
                    value={auctionData.startprice}
                    onChange={handleChange}
                  />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> 최소 입찰가 </TableCell>
                  <TableCell>
                  <Input
                    type="number"
                    id="acuMinBid"
                    name="minbid"
                    value={auctionData.minbid}
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
  );
}