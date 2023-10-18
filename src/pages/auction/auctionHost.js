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
    const [auctionHostData, setAuctionHostData] = useState([]);

    const userno = 1; // 유저번호 일단 하드코딩

    useEffect(() => {
      // 클라이언트에서 'userno' 값을 params로 전달하여 요청을 보냅니다.
      axios.get(`http://localhost:8081/auction/auctionHost`, {
        params: {
          userno: userno,
        }
      })
      .then((response) => {
        setAuctionHostData(response.data);
      })
      .catch((error) => {
        console.error('경매 호스트 정보를 불러오는 중 오류 발생:', error);
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
              <Dropdown.Item eventKey="1" onClick={() => router.push({ pathname: '/auction/auctionHost', query: { userno } })}>HOST</Dropdown.Item>
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
                <td>최종 금액</td>
                <td>남은 시간</td>
                <td>낙찰 자</td>
              </TableE>
            </thead>
            <tbody>
              {auctionHostData.map((auctionHostData) =>(
              <tr className="cart__list__detail">
                <TableC>
                  <TableD img src="/assets/images/auction/ac1.PNG" alt="magic mouse" /> 
                  {/* 이미지 수정필요!! */}
                </TableC>
                <TableB style={{ width: '35%' }}>
                  <TaB_div>
                    <p>{auctionHostData.auctiontitle}</p>
                    <Tab_div_b>
                    <Button_ onClick={() => {
                      const auctionno = auctionHostData.auctionno;
                      router.push(`/auction/auctionEdit?auctionno=${auctionno}`);
                    }}>
                      경매 수정
                    </Button_>
                    </Tab_div_b>
                  </TaB_div>
                </TableB>
                <TableA className="cart__list__option" style={{ width: '27%' }}>
                  <p>{auctionHostData.lastprice} 원</p>
                </TableA>
                <TableA style={{ width: '15%' }}>
                  <span >{auctionHostData.lasttime}</span><br />
                </TableA>
                <TableA style={{ width: '15%' }} onClick={() => router.push('/auction/auctionHost_chat') }>Jangu06</TableA>
              </tr>
              ))}
            </tbody>
        </TableF>
      </Host>
    </Container>
  );
}

export default AuctionHost;