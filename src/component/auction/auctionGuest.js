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
    width: 85%;
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
        <Container__3>
          <MyAcu>
            AUCTION GUEST
          </MyAcu>
        </Container__3>
      </Container__1>
      <Host className="Host">
        <TableF className="cart__list">
            <thead>
              <TableE>
                <td>이미지</td>
                <td>경매 물품</td>
                <td>최고 입찰 금액</td>
                <td>남은 시간</td>
                <td>나의 입찰 금액</td>
              </TableE>
            </thead>
            <tbody>
              <tr className="cart__list__detail">
                <TableC>
                  <TableD img src="/assets/images/auction/ac1.PNG" alt="magic mouse" />
                </TableC>
                <TableB style={{ width: '35%' }}>
                  <p onClick={() => router.push('/auction/auctionGuest_chat') }>자퇴서</p>
                </TableB>
                <TableA className="cart__list__option" style={{ width: '27%' }}>
                  <p>2000000 원</p>
                </TableA>
                <TableA style={{ width: '15%' }}>
                  <span className="price">01 : 35 : 01 : 10</span><br />
                </TableA>
                <TableA style={{ width: '15%' }}>800000 원</TableA>
              </tr>
            </tbody>
        </TableF>
      </Host>
    </Container>
  );
}

export default AuctionGuest;