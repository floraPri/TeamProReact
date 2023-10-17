import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';

import Chat from "@/component/auction/chat";

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

  const [remainingTime, setRemainingTime] = useState({ hours: 60, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime.seconds > 0) {
        setRemainingTime(prevTime => ({ ...prevTime, seconds: prevTime.seconds - 1 }));
      } else if (remainingTime.minutes > 0) {
        setRemainingTime(prevTime => ({ ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 }));
      } else if (remainingTime.hours > 0) {
        setRemainingTime(prevTime => ({ ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 }));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  const lastTimeColor = remainingTime.hours < 1 ? "red" : "green";

    return(
      <Container_>
        <AcuDiv_1>
          <div>
            <Row xs={1} md={1} className="g-1">
              {Array.from({ length: 1 }).map((_, idx) => (
                <Col key={idx}>
                  <Card>
                    <Card.Img variant="top" src="/assets/images/auction/ac1.PNG" />
                    <Card.Body>
                      <h2>오늘의 물품</h2>
                      <CardTitle>
                        자퇴서&nbsp;
                      </CardTitle>
                      <span>
                          경매 남은 시간&nbsp;
                      </span>
                      <LastTime color={lastTimeColor}>
                        {String(remainingTime.hours).padStart(2, '0')} : {String(remainingTime.minutes).padStart(2, '0')} : {String(remainingTime.seconds).padStart(2, '0')}
                      </LastTime>
                      <hr></hr>
                      <span>물품 설명</span>
                      <br></br>
                      <Card.Text>
                        자신의 책무에서 벗어나게 해줄 수 있는 마법의 종이
                        <br></br>
                        보통은 눈에 띄지 않으나, 꿈을 잃어 캠퍼스를 방황하는 이들에게 종이가 찾아간다는 전설이 있다
                        <br></br>
                        모든 것을 잃은 자들의 두 눈과 귀를 속여 돌이킬 수 없는 선택을 하게 만든다
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
                      <Id onClick={() => router.push('') }>화석</Id>
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
                      6
                    </span>
                    명
                  </ListGroupItem>

                  <ListGroupItem >
                    시작 금액 : 
                    <span>
                      650000
                    </span>
                    원
                  </ListGroupItem>

                  <ListGroupItem >
                    즉시 구매가 :
                    <span>
                      1000000
                    </span>
                    원
                  </ListGroupItem>

                  <ListGroupItem >
                    현재 최소 입찰가 :
                    <span>
                      50000
                    </span>
                    원
                  </ListGroupItem>

                  <ListGroupItem >
                    현재 최종가 :
                    <span>
                      1150000
                    </span>
                    원
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
          </AcuInfo>
          <br></br>
          <div>
          <Container className="panel">
            <Row xs={1} md={1} className="g-1">
            <Col>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm>
                  <Form.Control type="password" placeholder="입찰금액을 입력하세요" />
                </Col>
              </Form.Group>
              <div className="d-grid gap-1">
                  <Button variant="secondary" type="submit" >
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