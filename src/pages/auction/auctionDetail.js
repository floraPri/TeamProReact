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
import Chat from "@/component/auction/chat";
import { getAuthToken } from "@/component/user/axios_helper";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export async function getServerSideProps(context) {
  const auctionno = context.query.auctionno;
  return {
    props: { initialAuctionno: auctionno }
  };
}

export default function AuctionDetail ({ initialAuctionno }){

  const router = useRouter();
  const [auctionno, setAuctionno] = useState(initialAuctionno);
  const lastTimeColor = "green";
  const [messages, setMessages] = useState([]);
  
  const [stompClient, setStompClient] = useState(null);
  
  const [auctionData, setAuctionData] = useState({
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
  
  const [newMessage, setNewMessage] = useState(auctionData || []);
  const [auctionStartData, setAuctionStartDate] = useState ({
    name: '',
    lastprice: 0,
    auctionno: auctionno,
  });
  
  console.log(auctionStartData.name);

  useEffect(() => {
    // 웹소켓 연결
    const socket = new SockJS('http://localhost:8081/auction/auctionDetail');
    const localStompClient  = Stomp.over(socket);

    // STOMP 연결
    localStompClient.connect({}, () => {
      localStompClient.subscribe('/topic/receive/message', (message) => {
        console.log("Received message:", message.body);

          if (message.body) {
              const messageBody = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, messageBody]);
          }
      });
    });
    
    setStompClient(localStompClient);

    const name = localStorage.getItem("name");
    setAuctionStartDate((prevData) => ({
      ...prevData,
      name: name,
    }))
    
    axios.get(`http://localhost:8081/auction/auctionDetail?auctionno=${auctionno}`, {
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
        setMessages([{
          NickName: data.name,
          message: data.lastprice
        }]);

      })
      .catch((error) => {
        console.error('경매 정보를 불러오는 중 오류 발생:', error);
      });

      // 컴포넌트 언마운트 시 웹소켓 연결 해제
      return () => {
        if (localStompClient.connected) {
          localStompClient.disconnect();
        }
      };

  }, [auctionno]);


  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
};

  const handleSend = (e) => {
    const { name, value } = e.target;
        setAuctionStartDate((prevData) => ({
          ...prevData,
          [name]: value,
        }))
    
  };

  const combinedHandleChange = (e) => {
    handleSend(e);
    handleNewMessageChange(e);
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (newMessage) {
      // 메시지를 서버로 보내고 STOMP를 통해 다시 수신
      stompClient.send('/app/send/message', {}, JSON.stringify({ message: newMessage }));
      setNewMessage('');
      console.log('여기');
      // messages 상태 업데이트
      const NickName = localStorage.getItem("name"); // 현재 사용자의 이름을 가져옵니다.
      const message = newMessage;
      const messageFull = { NickName, message };
      setMessages([...messages, messageFull]);
      setNewMessage('');
    }

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
        const response = await axios.post('http://localhost:8081/auction/auctionStart', requestData, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          }
        });
        
      } catch (error) {
        console.error('입찰 저장 중 오류 발생:', error);
      }
  };
  
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

                  {messages.map((message) => {
                    console.log(message);
                    const uniqueKey = `${message.message}-${message.NickName}`;

                    return (
                      <div key={uniqueKey}>
                        <ListGroupItem>
                          현재 최종가 :
                          <span>
                            {message.message}
                          </span>
                          원
                        </ListGroupItem>

                        <ListGroupItem>
                          입찰자 :
                          <span>
                            {message.NickName}
                          </span>
                        </ListGroupItem>
                      </div>
                    );
                  })}
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
                    onChange={combinedHandleChange}
                  
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-1">
                  <Button variant="secondary" type="submit">
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