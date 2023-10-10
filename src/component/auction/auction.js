import Card from 'react-bootstrap/Card';
import Link from "next/link";
import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

function Auction() {

  const regions = [
    "강북구", "강남구", "강동구", "강서구", "관악구", "광진구", "구로구", "금천구",
    "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
    "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
  ];
  
  const Container = styled.div`
    display: flex;
    justify-content: center;
  `;
  
  const Cap = styled.img`
    width: 1800px;
  `;

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [data, setData] = useState([]); // 데이터를 저장할 상태

  const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 중 여부

    // 초기 데이터 로딩
    useEffect(() => {
      fetchData();
    }, []);
  
    // 스크롤 위치 감지
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  // 스크롤 위치에 따라 추가 데이터 로딩
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 100
    ) {
      // 스크롤 위치가 페이지 하단에 가까워지면 데이터 추가 로딩
      fetchData();
    }
  };

  const fetchData = async () => {
    if (!isLoading) {
      setIsLoading(true);
  
      // 실제 데이터를 가져오는 비동기 요청 코드를 여기에 구현
      // 예: const response = await fetch('API_ENDPOINT');
      // const newData = await response.json();
  
      // 임시로 setTimeout을 사용한 예제
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, index) => index + data.length);
        setData([...data, ...newData]);
        setIsLoading(false);
      }, 1000);
    }
  };
  
  // 데이터 추가 로딩 함수

  return (
    <Container>
      <div class="auctionDiv">
        3 개
        {/* <Link href="/auction/auctionDetail">상세페이지</Link> */}
      </div>
      <div class="constituency">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">지역구</option>
          {regions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
			{/* <div class="acu"> 
       <Link href="/auction/auctionDetail">
				<div class="ra"> */}
          {/* <div> 이미지 삽입 칸 </div> */}
					{/* <div class="card-body">
						<h4><p class="card-text">자퇴서</p></h4>
						<ul>
							<li>참여자 : 55 명</li>
							<li>시작금액 : 650000 원</li>
              <li>경매 남은 시간 : 55 : 38 : 51 : 13</li>
						</ul>
					</div>	
				</div>
        </Link>
			</div> */}
      {/* <Cap src="/assets/images/auction/auction.PNG" /> */}
      <div class="acu">
        <Link href="/auction/auctionDetail">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>자퇴서</Card.Title>
              <Card.Text>
                참여자 : 55 명<br/>
                시작금액 : 650000 원<br/>
                경매 남은 시간 : 55 : 38 : 51 : 13<br/>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </Container>
  );
}


// export default Auction;
// export { BasicExample }; // BasicExample 컴포넌트를 export
export default Auction;



