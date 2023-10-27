import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import axios from 'axios'
import { getAuthToken } from "@/component/user/axios_helper";

function AuctionGuest() {
  
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

    const router = useRouter();

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

    const [auctionGuestData, setAuctionGuestData] = useState([]);

    const [auctionGuestData_2, setAuctionGutesData_2] = useState([]);

   

    useEffect(() => { // 입찰중
      const fetchData = async () => {
        try {
        const response = await axios.get(`http://localhost:8081/auction/auctionGuest`, {
          params: {
            userno:localStorage.getItem("userno"),
            name: localStorage.getItem("name"),
          },
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          }
        });
        const data = response.data;
        // 현재 시간 가져오기
        const currentTime = new Date();
        // 경매 종료 시간과 비교하여 종료 여부 판단
        const updatedAuctionGuestData = data.map((auctionGuestData) => {
          const endTime = new Date(auctionGuestData.lasttime);
          const isAuctionEnded = currentTime > endTime;
          return {
            ...auctionGuestData,
            isAuctionEnded: isAuctionEnded,
          };
        });
        setAuctionGuestData(updatedAuctionGuestData);
      } catch (error) {
          console.error('경매 게스트 정보를 불러오는 중 오류 발생:', error);
        }
      };
      fetchData();
    },[]);

    function formatLastTime(lasttime, auendtime) {
      const date = new Date(lasttime);
      const formattedTime = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
      return formattedTime;

    }

    useEffect(() => { // 낙찰 완료
      console.log('낙찰완료 테스트')
      axios.get( `http://localhost:8081/auction/auctionGuest_1`,
      {
        params: {
          userno:localStorage.getItem("userno"),
          name: localStorage.getItem("name")
        },
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      })
      .then((response) => {
        setAuctionGutesData_2(response.data);
      })
      .catch((error) => {
        console.error('경매 게스트 정보를 불러오는 중 오류 발생:', error);
      });
    }, []);

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
            AUCTION GUEST
          </MyAcu>
        </Container__3>
        <br></br>
        <h3>낙찰 완료</h3>
        <TableF className="cart__list">
            <thead>
              <TableE>
                <td>이미지</td>
                <td colspan='2'>경매 물품</td>
                <td>경매 종료 시간</td>
                <td>나의 낙찰 금액</td>
              </TableE>
            </thead>
            <tbody>
            {auctionGuestData_2.map((auctionGuestData_2) =>(
              <tr className="cart__list__detail">
                <TableC>
                  <TableD img src={auctionGuestData_2.image} alt="magic mouse" />
                </TableC>
                <TableB style={{ width: '35%' }} >
                  <p onClick={() => {
                    const auctionno = auctionGuestData_2.auctionno;
                   // router.push(`/auction/auctionGuest_chat`)
                    router.push(`/auction/auctionGuest_chat?auctionno=${auctionno}`) //채팅 활성화시 활성
                  }}>
                  {auctionGuestData_2.auctiontitle}
                  </p>
                </TableB>
                <TableA className="cart__list__option" style={{ width: '27%' }}>
                </TableA>
                <TableA style={{ width: '18%' }}>
                  <span className="price">
                  {formatLastTime(auctionGuestData_2.auendtime)}
                  </span><br />
                </TableA>
                <TableA style={{ width: '15%' }}>{auctionGuestData_2.bidprice} 원</TableA>
              </tr>
            ))}
            </tbody>
        </TableF>
        <br></br>
        <hr></hr>
        <h3>참여중인 경매</h3>
        <TableF className="cart__list">
            <thead>
              <TableE>
                <td>이미지</td>
                <td>경매 물품</td>
                <td>최고 입찰 금액</td>
                <td>남은 시간</td>
              </TableE>
            </thead>
            <tbody>
            {auctionGuestData.map((auctionGuestData) =>(
              <tr className="cart__list__detail">
                <TableC>
                  <TableD img src={auctionGuestData.image} alt="magic mouse" />
                </TableC>
                <TableB style={{ width: '35%' }}>
                  <p onClick={() => {
                  if (!auctionGuestData.isAuctionEnded) {
                   const auctionno = auctionGuestData.auctionno;
                  router.push(`/auction/auctionDetail`);
                  //router.push(`/auction/auctionDetail?auctionno=${auctionno}`); //상세페이지 활성화 시
                  }
                  }}>
                  {auctionGuestData.auctiontitle}
                  </p>
                </TableB>
                <TableA className="cart__list__option" style={{ width: '27%' }}>
                  <p>{auctionGuestData.lastprice} 원</p>
                </TableA>
                <TableA style={{ width: '18%' }}>
                  {auctionGuestData.isAuctionEnded ? "경매 종료" : formatLastTime(auctionGuestData.lasttime)}
                </TableA>
              </tr>
            ))}
            </tbody>
        </TableF>
      </Host>
    </Container>
  );
}
export default AuctionGuest;