import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import Chat from './chat_Host'

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
          <Acu_name>
            경매 물품 :&nbsp;
          </Acu_name>
          <Acu_name className='Acuname'>
            자퇴서
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
                        1150000
                      </span>
                      원
                    </ListGroupItem>

                    
                    <ListGroupItem >
                      HOST :
                      <span>
                        화석
                      </span>
                    </ListGroupItem>

                    <ListGroupItem >
                      입찰자 :
                      <span>
                        yebiFossil19
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