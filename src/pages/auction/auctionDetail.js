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
//import { useInterval } from "./hooks";
//import Nav from "./Nav";

export async function getServerSideProps(context) {
  const auctionno = context.query.auctionno;
  return {
    props: { initialAuctionno: auctionno }
  };
}

export default function AuctionDetail ({ initialAuctionno }){

  // 카운트 다운
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const router = useRouter();
  const [auctionno, setAuctionno] = useState(initialAuctionno);
  const lastTimeColor = "green";
  const [lastTime, setLastTime] = useState(null);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [bids, setBids] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [auctionData, setAuctionData] = useState({});
  const [newBid, setNewBid] = useState(auctionData || []);
  const [auctionStartData, setAuctionStartData] = useState ({
    name: '',
    lastprice: 0,
    auctionno: auctionno,
  });

  // 카운트 다운
  useEffect(() => {
    const target = new Date(lastTime);
    console.log(target);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      const newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);
      if (newHours !== hours || newMinutes !== minutes || newSeconds !== seconds) {
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
      }
      if (newHours <= 0 && newMinutes <= 0 && newSeconds <= 0) {
        setIsAuctionEnded(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastTime]);

  useEffect(() => {
    console.log("useEffect is running");
    // 웹소켓 연결
    const socket = new SockJS('http://localhost:8081/auction/auctionDetail');
    const localStompClient  = Stomp.over(socket);
    const topic = `/topic/receive/bid/${auctionno}`;

    // STOMP 연결
    localStompClient.connect({}, () => {
      localStompClient.subscribe(topic, (bid) => {
          if (bid.body) {
              const bidBody = JSON.parse(bid.body);
              setBids((prevBids) => [...prevBids, bidBody]);
              setAuctionData(prevData => ({
                ...prevData,
                lastprice: bidBody.bid,
                name: bidBody.bidName
            }));
          }
      });
    }, (error) => {
      console.error("WebSocket connection error:", error);
    });
    
    setStompClient(localStompClient);

    // 입찰할때 넘기는 값
    const bidName = localStorage.getItem("name");
    setAuctionStartData((prevData) => ({
      ...prevData,
      name: bidName,
      lastprice: '',
    }))
    
    axios.get(`http://localhost:8081/auction/auctionDetail?auctionno=${auctionno}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      }
    })
      .then((response) => {
        const data = response.data;
        setAuctionData(data);
        setLastTime(response.data.lasttime);
        setBids([{
          name : data.name,
          bid: data.lastprice
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

  }, [auctionno, auctionData.lastprice, auctionData.name]);


  const handleNewBidChange = (e) => {
    setNewBid(e.target.value);
  };

  const handleSend = (e) => {
    const { name, value } = e.target;
        setAuctionStartData((prevData) => ({
          ...prevData,
          [name]: value,
        }))
    
  };

  const combinedHandleChange = (e) => {
    handleSend(e);
    handleNewBidChange(e);
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (newBid && parseFloat(newBid) > parseFloat(auctionData.lastprice)) {
      // 메시지를 서버로 보내고 STOMP를 통해 다시 수신
      stompClient.send(`/app/send/bid/${auctionno}`, {}, JSON.stringify({ bid: newBid , bidName: auctionStartData.name}));
      
      // messages 상태 업데이트
      const bidFull = {bidName: auctionStartData.name, bid: newBid };
      setBids([...bids, bidFull]);
      setNewBid('');
    }

    if (auctionStartData.lastprice <= auctionData.lastprice) {
      alert('최고 입찰가보다 높은 가격을 입력하셔야 합니다');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/auction/auctionStart', auctionStartData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        }
    });
    
    // 서버에서 새로운 입찰 내역을 받아와 화면에 업데이트
    setAuctionData({
      ...auctionData,
      lastprice: updatedAuctionData.lastprice,
      cham: updatedAuctionData.cham,
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
                      {isAuctionEnded  ? (
                        '경매가 종료되었습니다'
                      ) : (
                        <>
                          {hours}시간 {minutes}분 {seconds}초
                        </>
                      )}
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

                {bids.length > 0 && (
                  <>
                    <ListGroupItem>
                      현재 최종가 :
                      <span>
                        {bids[bids.length - 1].bid}
                      </span>
                      원
                    </ListGroupItem>
                    <ListGroupItem>
                      입찰자 :
                      <span>
                        {bids[bids.length - 1].name}
                      </span>
                    </ListGroupItem>
                  </>
                )}
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
