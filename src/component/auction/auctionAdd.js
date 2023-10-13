import styled from "styled-components";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

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

export default function AuctionAdd() {
  const [auctionData, setAuctionData] = useState({
    auctionTitle: '',
    auctionContent: '',
    buyNow: 0,
    startPrice: 0,
    minBid: 0,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setAuctionData({ ...auctionData, [name]: files[0] });
    } else {
      setAuctionData({ ...auctionData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const formData = new FormData();
  formData.append("auctionTitle", auctionData.auctionTitle);
  formData.append("auctionContent", auctionData.auctionContent);
  formData.append("buyNow", auctionData.buyNow);
  formData.append("startPrice", auctionData.startPrice);
  formData.append("minBid", auctionData.minBid);
  formData.append("image", auctionData.image);

    try {
      // 경매 정보를 서버로 전송
      const response = await fetch('/api/createAuction', {
        method: 'POST',
        body: JSON.formData,
      });

      if (response.status === 200) {
        console.log('경매가 성공적으로 저장되었습니다.');
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
        <AcuTi>새로운 경매 HOST</AcuTi>
        <AcuAdd_1>
          <form onSubmit={handleSubmit}>
            <hr></hr>
            <From_1>
              <From_2>
                <label htmlFor="acuTitle">경매 물품</label>&nbsp;&nbsp;&nbsp;
              </From_2>
              <From_3>
                <Input
                  type="text"
                  id="acuTitle"
                  name="auctionTitle"
                  value={auctionData.auctionTitle}
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
                  name="auctionContent"
                  value={auctionData.auctionContent}
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
                  name="buyNow"
                  value={auctionData.buyNow}
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
                  name="startPrice"
                  value={auctionData.startPrice}
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
                  name="minBid"
                  value={auctionData.minBid}
                  onChange={handleChange}
                />
              </From_3>
            </From_1>
            <>
            <Button variant="primary" size="lg" active type="submit">
              경매 등록
            </Button>
            </>
          </form>
        </AcuAdd_1>
      </AcuAdd>
    </Container_>
  );
}