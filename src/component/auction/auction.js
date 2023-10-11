import Card from 'react-bootstrap/Card';
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";

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
    margin-top: 10px;
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
    
  const Cap = styled.img`
    width: 1800px;
  `;

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const router = useRouter();

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
        <Container__3>
          <AuctionDiv className="auctionDiv">
            <AuctionDiv__1 className="auctionDiv__1">3</AuctionDiv__1>개
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
      </Container__1>  
        <Acu class="acu">
          <Link href="/auction/auctionDetail">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/images/auction/ac1.PNG" />
              <Card.Body>
                <Card.Title>자퇴서</Card.Title>
                <Card.Text>
                  참여자 : 55 명<br/>
                  시작금액 : 650000 원<br/>
                  경매 남은 시간 : 55 : 38 : 51 : 13<br/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Acu>
    </Container>
  );
}

export default Auction;



