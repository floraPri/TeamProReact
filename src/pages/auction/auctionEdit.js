import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/router";
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper";

const AcuAdd = styled.div`

`;

const AcuTi = styled.span`
  font-weight: bold;
  font-size: 33px;
`;

const Container_ = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 1000px;
  margin: auto;
  margin-top: 30px;
  overflow: hidden;
`;

const AcuAdd_1 = styled.div`
  font-size: 22px;
  display: flex;
`;

const From_1 = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const From_2 = styled.span`
  padding-right: 30px;
  font-weight: bold;
`;

const From_3 = styled.div`
  margin-left: 30px;
  flex-direction: column;
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
    console.log(auctionData.image);
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
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('경매가 성공적으로 수정되었습니다.');
      } else {
        console.error('경매 저장 중 오류 발생');
      }
    } catch (error) {
      console.error('경매 저장 중 오류 발생:', error);
    }
  };

  return (
    <Container_>
      <AcuAdd>
        <AcuTi>경매 수정 HOST</AcuTi>
        <AcuAdd_1>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <hr></hr>
            <From_1>
              <From_2>
                <label htmlFor="acuTitle">경매 물품</label>&nbsp;&nbsp;&nbsp;
              </From_2>
              <From_3>
                <Input
                  type="text"
                  id="acuTitle"
                  name="auctiontitle"
                  value={auctionData.auctiontitle}
                  onChange={handleChange}
                />
              </From_3>
            </From_1>
            <From_1>
              <From_2>
                <label htmlFor="image">경매 이미지</label>
              </From_2>
              <From_3>
                <FileInput
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*" 
                  onChange={handleChange}
                />
              </From_3>
            </From_1>            
            <From_1>
              <From_2>
                <label htmlFor="acuContent">경매 내용</label>&nbsp;&nbsp;&nbsp;
              </From_2>
              <From_3>
                <Textarea
                  rows={3}
                  id="acuContent"
                  name="auctioncontent"
                  value={auctionData.auctioncontent}
                  onChange={handleChange}
                />
              </From_3>
            </From_1>
            <From_1>
              <From_2>
                <label htmlFor="acuBuyNow">즉시 구매가</label>
              </From_2>
              <From_3>
                <Input
                  type="number"
                  id="acuBuyNow"
                  name="buynow"
                  value={auctionData.buynow}
                  onChange={handleChange}
                />
              </From_3>
            </From_1>
            <From_1>
              <From_2>
                <label htmlFor="acuStartPrice">시작가</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </From_2>
              <From_3>
                <Input
                  type="number"
                  id="acuStartPrice"
                  name="startprice"
                  value={auctionData.startprice}
                  onChange={handleChange}
                />
              </From_3>
            </From_1>
            <From_1>
              <From_2>
                <label htmlFor="acuMinBid">최소 입찰가</label>
              </From_2>
              <From_3>
              <Input
                  type="number"
                  id="acuMinBid"
                  name="minbid"
                  value={auctionData.minbid}
                  onChange={handleChange}
                />
              </From_3>
            </From_1>
            <>
            <Button variant="primary" size="lg" active type="submit">
              경매 업데이트
            </Button>
            </>
          </form>
        </AcuAdd_1>
      </AcuAdd>
    </Container_>
  );
}