import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import { useRouter } from "next/router";
import axios from 'axios';
import io from 'socket.io-client';

import Chat from "@/component/auction/chat";

import { getAuthToken } from "@/component/user/axios_helper";

const Container_ = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: flex-start;

  width: 1000px;
  
  margin: auto;
  margin-top: 50px;
  overflow: hidden;
`;

const AcuDiv_1 = styled.div`
  // padding-top: 20px;
  // padding-bottom: 20px;
  margin-right: 10px;
  flex: 1;
`;

const LastTime = styled.span`
  color: green;
  font-weight: bold;
  font-size: 20px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const Id_name = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const Id = styled.div`
  font-size: 20px;
`;

const AcuDiv_2 = styled.div`
  flex: 1;
`;

const ListGroupItem = styled(ListGroup.Item)`
  span {
    margin-left: 10px;
  }
`;

const AcuInfo = styled.div`
  padding-left: 12px;
`;

const AcuDiv_3 = styled.div`
`;

export default function AuctionDetail (){

  const router = useRouter();

  const lastTimeColor = "green";

  const { auctionno } = router.query;
  console.log('경매 번호', auctionno);

  const [auctionData, setAuctionData] = useState({
    userno: 0,
    auctiontitle: '',
    image: '',
    auctioncontent: '',
    buynow: 0,
    startprice: 0,
    lastprice: 0,
    minbid: 0,
    austarttime: '',
    lasttime: '',
    cham: 0,
    address: '',
    name: '',
  });

  const [auctionStartData, setAuctionStartDate] = useState ({
    name: '',
    lastprice: 0,
    auctionno: auctionno,
  });
  
  console.log(auctionStartData.name);

  useEffect(() => {

    const name = localStorage.getItem("name");
    setAuctionStartDate((prevData) => ({
      ...prevData,
      name: name,
    }));

    axios.get(`http://localhost:8081/auction/auctionDetail`, {
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
          userno: data.userno,
          auctiontitle: data.auctiontitle,
          image: data.image,
          auctioncontent: data.auctioncontent,
          buynow: data.buynow,
          startprice: data.startprice,
          lastprice: data.lastprice,
          minbid: data.minbid,
          austarttime: data.austarttime,
          lasttime: data.lasttime,
          cham: data.cham,
          address: data.address,
          name: data.name,
        });
      })
      .catch((error) => {
        console.error('경매 정보를 불러오는 중 오류 발생:', error);
      });
  }, [auctionno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuctionStartDate((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auctionStartData.lastprice <= auctionData.lastprice) {
      alert('최고 입찰가보다 높은 가격을 입력하셔야 합니다');
      return;
    }

  const requestData = {
  auctionno: auctionStartData.auctionno,
  name: auctionStartData.name,
  lastprice: auctionStartData.lastprice,
  };
    try {
      const response = await axios.post('http://localhost:8081/auction/acutionStart', requestData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      });
      if (response.status === 200) {
        console.log('입찰 시작 되었습니다.');
      } else {
        console.error('입찰 저장 중 오류 발생');
      }
    } catch (error) {
      console.error('입찰 저장 중 오류 발생:', error);
    }
  };

    // const socket = io('ws://localhost:8081/ws', {
    //   query: {
    //     Authorization: `Bearer ${getAuthToken()}`
    //   }
    // });

    //   // 소켓 이벤트 처리
    // const sendBidAmount = (amount) => {
    //   socket.emit('bidAmount', amount);
    // };

    // // 서버로부터 입찰금액 업데이트를 받는 이벤트 처리
    // socket.on('newBidAmount', (amount) => {
    //   console.log('새로운 입찰금액:', amount);
    //   // 여기에서 입찰금액을 업데이트할 수 있음
    // });  
  

    return(
      <Container_>
        <AcuDiv_1>
          <div>
            <Row xs={1} md={1} className="g-1">
              {Array.from({ length: 1 }).map((_, idx) => (
                <Col key={idx}>
                  <Card>
                    <Card.Img variant="top" src={auctionData.image} />
                    <Card.Body>
                      <h2>{auctionData.auctiontitle}</h2>
                      <CardTitle>
                        판매자: {auctionData.name}
                      </CardTitle>
                      <span>
                        경매 남은 시간&nbsp;
                      </span>
                      <LastTime color={lastTimeColor}>
                        {auctionData.lasttime}
                      </LastTime>
                      <hr></hr>
                      <span>물품 설명</span>
                      <br></br>
                      <Card.Text>
                        {auctionData.auctioncontent}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>            
          </div>
          <br></br>
          <div>
              <Row xs={1} md={1} className="g-1">
                <Col>
                  <Card>
                    <Card.Body>
                      <Id_name><span className="id">판매자</span></Id_name>
                      <hr></hr>
                      <Id onClick={() => router.push('') }>{auctionData.name}</Id>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
          </div>
        </AcuDiv_1>
        <AcuDiv_2>
          <AcuInfo>
            <Row xs={1} md={1} className="g-1">
              <Col>
                <ListGroup >
                  <ListGroupItem >
                    현재 경매 참여자 : 
                    <span>
                    {auctionData.cham}
                    </span>
                    명
                  </ListGroupItem>

                  <ListGroupItem >
                    시작 금액 : 
                    <span>
                    {auctionData.startprice}
                    </span>
                    원
                  </ListGroupItem>

                  <ListGroupItem >
                    즉시 구매가 :
                    <span>
                    {auctionData.buynow}
                    </span>
                    원
                  </ListGroupItem>

                  <ListGroupItem >
                    현재 최소 입찰가 :
                    <span>
                    {auctionData.minbid}
                    </span>
                    원
                  </ListGroupItem>

                  <ListGroupItem >
                    현재 최종가 :
                    <span>
                    {auctionData.lastprice}
                    </span>
                    원
                  </ListGroupItem>

                  <ListGroupItem >
                    입찰자 :
                    <span>
                    {auctionData.name}
                    </span>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>            
          </AcuInfo>
          <br></br>
          <div>
          <Container className="panel">
            <Row xs={1} md={1} className="g-1">
            <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Col sm>
                  <Form.Control 
                    placeholder="입찰금액을 입력하세요" 
                    type="number"
                    id="lastprice"
                    name="lastprice"
                    value={auctionStartData.lastprice}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-1">
                  <Button variant="secondary" type="submit" onClick={() => sendBidAmount(auctionStartData.lastprice)}>
                    입찰하기
                  </Button>
              </div>
            </Form>
            </Col>
            </Row>
          </Container>
          </div>
          <hr></hr>
          <div>
            <Row xs={1} md={1} className="g-1">
              <Col>
                <Chat/>
              </Col>
            </Row>
          </div>
        </AcuDiv_2>
        <AcuDiv_3>
        </AcuDiv_3>
      </Container_>
    )
}