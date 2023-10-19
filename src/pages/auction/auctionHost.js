import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import axios from 'axios';

function AuctionHost() {

  function timeCount(endTime) {
    const currentTime = new Date();
    const endTimeDate = new Date(endTime); // endTime을 Date 객체로 파싱

    // 년, 월, 일, 시, 분, 초를 가져오기
    const years = endTimeDate.getFullYear() - currentTime.getFullYear();
    const months = endTimeDate.getMonth() - currentTime.getMonth();
    const days = endTimeDate.getDate() - currentTime.getDate();
    const hours = endTimeDate.getHours() - currentTime.getHours();
    const minutes = endTimeDate.getMinutes() - currentTime.getMinutes();
    const seconds = endTimeDate.getSeconds() - currentTime.getSeconds();

    // 남은 시간을 계산
    const totalMilliseconds = years * 31536000000 + months * 2592000000 + days * 86400000 + hours * 3600000 + minutes * 60000 + seconds * 1000;

    const remainingHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);

    return { hours: remainingHours, minutes: remainingMinutes, seconds: remainingSeconds };
  }

  const Container__1 = styled.div`
    display: flex;      /* 한줄(수평)로 배치 */
    justify-content: space-between;
  `;

  const Container__2 = styled.div`
    width: 15%;
    height: 10px;
  `;

  const Container__3 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #000;
  `;

  const Host = styled.div`
    margin-left: 200px;
    text-decoration: none;
    `;

  const Container = styled.div`
    width: 1200px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 50px;
    margin-left: 50px;
    `;

  const MyAcu = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 33px;
    `;

  const TableA = styled.td`
        border-left: 2px solid whitesmoke;
        border-top: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
        font-size: 17px;
        padding-left: 10px;
    `;

  const TableB = styled.td`
        font-size: 17px;
        margin-top: 6px;
        font-weight: bold;
        border-top: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
    `;

  const TaB_div = styled.div`
        display:flex;
    `;

  const Tab_div_b = styled.div`
        margin-left:70px;
    `;

  const Button_ = styled.button`
      background-color: #198754;
      color: white;
      border-radius: 8px;
      padding: 3px 20px;
      border: none;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    `;

  const TableC = styled.td`
        border-top: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
     `;

  const TableD = styled.img`
        width: 120px;
    `;

  const TableE = styled.tr`
        margin-left: 15px;
    `;

  const TableF = styled.table`
    `;


  const router = useRouter();
  const userno = 1; // 유저번호 일단 하드코딩

  const [auctionHostData, setAuctionHostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/auction/auctionHost`, {
          params: {
            userno: userno,
          }
        });
        const data = response.data;
        // 현재 시간 가져오기
        const currentTime = new Date();
        // 경매 종료 시간과 비교하여 종료 여부 판단
        const updatedAuctionHostData = data.map((auction) => {
          const endTime = new Date(auction.lasttime);
          const isAuctionEnded = currentTime > endTime;
          return {
            ...auction,
            isAuctionEnded: isAuctionEnded,
          };
        });
        setAuctionHostData(updatedAuctionHostData);
      } catch (error) {
        console.error('경매 호스트 정보를 불러오는 중 오류 발생:', error);
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
            <Button variant="success" onClick={() => router.push('/auction/auction')}>오늘의 경매 PARTY</Button>
            <DropdownButton variant="success"
              as={ButtonGroup}
              title="나의 경매"
              id="bg-vertical-dropdown-1"
            >
              <Dropdown.Item eventKey="1" onClick={() => router.push('/auction/auctionHost')}>HOST</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={() => router.push('/auction/auctionGuest')}>GUEST</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Container__2>
      </Container__1>
      <Host className="Host">
        <Container__3>
          <MyAcu>
            AUCTION HOST
          </MyAcu>
        </Container__3>
        <TableF className="cart__list">
          <thead>
            <TableE>
              <td>이미지</td>
              <td>경매 물품</td>
              <td>최종 입찰 금액</td>
              <td>경매 종료 시간</td>
              <td>GUEST 채팅</td>
            </TableE>
          </thead>
          <tbody>
            {auctionHostData.map((auctionHostData) => (
              <tr className="cart__list__detail">
                <TableC>
                  <TableD img src="/assets/images/auction/ac1.PNG" alt="magic mouse" />
                  {/* 이미지 수정필요!! */}
                </TableC>
                <TableB style={{ width: '46%' }}>
                  <TaB_div>
                    <p>{auctionHostData.auctiontitle}</p>
                    <Tab_div_b>
                      <Button_ onClick={() => {
                        if (!auctionHostData.isAuctionEnded) { // 경매가 종료되지 않았을 때만 수정 가능
                          const auctionno = auctionHostData.auctionno;
                          router.push(`/auction/auctionEdit?auctionno=${auctionno}`);
                        }
                      }}>
                        {auctionHostData.isAuctionEnded ? "경매 종료" : "경매 수정"}
                      </Button_>
                    </Tab_div_b>
                  </TaB_div>
                </TableB>
                <TableA className="cart__list__option" style={{ width: '27%' }}>
                  <p>{auctionHostData.lastprice} 원</p>
                </TableA>
                <TableA style={{ width: '18%' }}>
                  {auctionHostData.isAuctionEnded ? "경매 종료" : formatLastTime(auctionHostData.lasttime)}
                </TableA>
                <TableA style={{ width: '20%' }}>
                  {auctionHostData.name}
                  <Button_ onClick={() => {
                    const auctionno = auctionHostData.auctionno;
                    router.push(`/auction/auctionHost_chat`);
                    // router.push(`/auction/auctionHost_chat?auctionno=${auctionno}`); 채팅 활성화시 활성
                  }}>
                    채팅
                  </Button_>
                </TableA>
              </tr>
            ))}
          </tbody>
        </TableF>
      </Host>
    </Container>
  );
}

export default AuctionHost;