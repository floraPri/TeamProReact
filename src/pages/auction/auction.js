import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import axios from 'axios';

function Auction() {

  const regions = [
    "강북구", "강남구", "강동구", "강서구", "관악구", "광진구", "구로구", "금천구",
    "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
    "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
  ];
  
  const Container__1 = styled.div`
    display: flex;      /* 한줄(수평)로 배치 */
    justify-content: space-between;
  `;

  const Container__2 = styled.div`
    width: 15%;
    height: 10px;
  `;

  const Container__3 = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000;
  `;

    const Acu = styled.div`
    margin-left: 200px;
    text-decoration: none;
  `;


  const Container = styled.div`
    margin-top: 10px; /* 위쪽 10px 마진 */
    margin-bottom: 10px; /* 아래쪽 10px 마진 */
    margin-right: 50px; /* 오른쪽 50px 마진 */
    margin-left: 50px; /* 왼쪽 50px 마진 */
  `;
  
  const AuctionDiv__1 = styled.div`
    padding-right: 5px;
    color: green;
    white-space: nowrap;
  `;

  const AuctionDiv = styled.div`
    display: flex;
    font-weight: bold;
    width : 10px;
    font-size: 22px;
  `;

  const ConstituencyDiv = styled.div`
    font-size: 19px;
  `;

  const CardDiv = styled.div`
    display: flex;
    padding-top: 30px;
  `;


  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const LastTime = styled.span`
  color: green;
  font-weight: bold;
`;

  const router = useRouter();

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/auction/auction');
        const data = response.data;
      // 현재 시간 가져오기
      const currentTime = new Date();
      // 경매 종료 시간과 비교하여 종료 여부 판단
      const updatedAuctionData = data.map((auction) => {
        const endTime = new Date(auction.lasttime);
        const isAuctionEnded = currentTime > endTime;
        return {
          ...auction,
          isAuctionEnded: isAuctionEnded,
        };  
      });
      setAuctions(updatedAuctionData);
      } catch (error) {
          console.error('경매 리스트 불러오기 오류: ', error);
      }
    };
      fetchData();
  }, []);

  function formatLastTime(lasttime) {
    const date = new Date(lasttime);
    const formattedTime = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    return formattedTime;
  }

  return (
    <Container>
      <Container__1>
        <Container__2>
          <ButtonGroup vertical>
          <Button variant="success" onClick={() => router.push('/auction/auction') } >오늘의 경매 PARTY</Button>

          <DropdownButton variant="success"
            as={ButtonGroup}
            title="나의 경매"
            id="bg-vertical-dropdown-1"
          >
            <Dropdown.Item eventKey="1" onClick={() => router.push('/auction/auctionHost') }>HOST</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => router.push('/auction/auctionGuest') }>GUEST</Dropdown.Item>
          </DropdownButton>
          </ButtonGroup>
        </Container__2>
      </Container__1> 
        <Acu class="acu">
          <Container__3>
            <AuctionDiv className="auctionDiv">
              <AuctionDiv__1 className="auctionDiv__1">1</AuctionDiv__1>개
            </AuctionDiv>
            <ConstituencyDiv class="constituency">
              <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">지역구</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </ConstituencyDiv>
          </Container__3>
            <CardDiv>
            {auctions.map((auction) => (
            <div onClick={() => {
                if (!auction.isAuctionEnded) { // 경매가 종료되지 않았을 때만 수정 가능
                  const auctionno = auction.auctionno;
                  router.push(`/auction/auctionDetail`);
                  // router.push(`/auction/auctionDetail/?auctionno=${auctionno}`); //상세 페이지 확정 후 활성화
                }
              }}
            >
              <Card key={auction.auctionno} style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={auction.image} /> */}
                    <Card.Body>
                      <Card.Title>{auction.auctiontitle}</Card.Title>
                      <Card.Text>
                        참여자: {auction.cham} 명<br />
                        시작금액: {auction.startprice} 원<br />
                        경매 남은 시간&nbsp;<br></br>
                        <LastTime>
                          {auction.isAuctionEnded ? "경매 종료" : formatLastTime(auction.lasttime)}
                        </LastTime>
                      </Card.Text>
                    </Card.Body>
                 </Card>
                 </div>
              ))}
              </CardDiv>
        </Acu>
    </Container>
  );
}

export default Auction;



