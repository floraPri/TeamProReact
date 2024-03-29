import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import Chat from '@/component/auction/chat_Guest';
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

function AuctionHost_chat() {

  
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
    //margin-left: 200px;
    text-decoration: none;
    `;

    const Container = styled.div`
    margin-top: 30px;
    // margin-bottom: 10px;
    // margin-right: 50px;
    margin-left: 50px;

    display: flex;
    flex-direction: row;
    //margin: auto;
    align-items: flex-start;
    
    `;

    const MyAcu = styled.div`
    display: flex;
    font-weight: bold;
    font-size: 33px;
    `;

    const router = useRouter();

    const Acu_name = styled.span`
    font-weight: bold;
    font-size: 25px;
    `;

    const Host_ch = styled.div`
    display: flex;
    margin-right: 100px;
    `;
    
    const ListGroup_div = styled.div`
    margin-top: 45px;
    margin-left: 30px;
    `;

    const ListGroupItem = styled(ListGroup.Item)`
    span {
      margin-left: 10px;
     }
    `;    

    const [hostAndGuestChatInfo, sethostAndGuestChatInfo] = useState([]);

    const { auctionno } = router.query;

    useEffect(() => {
      axios.get(`http://localhost:8081/auction/hostAndGuestChatInfo`, {
        params: {
          auctionno: auctionno,
        },
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      })
        .then((response) => {
          const data = response.data;
          sethostAndGuestChatInfo({
            auctiontitle: data.auctiontitle,
            lastprice: data.lastprice,
            name: data.name,
          });
        })
        .catch((error) => {
          console.error('채팅 정보를 불러오는 중 오류 발생:', error);
        });
    }, [auctionno]);

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
          <Acu_name>
            경매 물품 :&nbsp;
          </Acu_name>
          <Acu_name className='Acuname'>
            {hostAndGuestChatInfo.auctiontitle}
          </Acu_name>
          <Host_ch>
            <Chat></Chat>
            <ListGroup_div>
              <Row xs={1} md={1} className="g-1">
                <Col>
                  <ListGroup >
                    <ListGroupItem >
                      입찰 금액(구매확정가) :
                      <span>
                        {hostAndGuestChatInfo.lastprice}
                      </span>
                      원
                    </ListGroupItem>

                    <ListGroupItem >
                      입찰자 :
                      <span>
                        {hostAndGuestChatInfo.name}
                      </span>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>            
          </ListGroup_div>
          </Host_ch>
      </Host>
    </Container>
  );
}

export default AuctionHost_chat;