import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  margin: 0 auto;
  `;
  
const Box = styled.div`
  display: grid;
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin: 10px 20px 10px 20px;
  width:390px;
`;

const Price = styled.div`
  margin: 8px 0; 
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
`;

const Content = styled.div`
  font-size: 12px;
  margin: 8px 0;
`;

const DeliveryDate = styled.div`
  margin: 8px 0;
`;

const Con1 = styled.div`
  margin:10px;
  padding:10px;
`;
const SupportBtn = styled.button`
  text-align:center;
  justify-content: center;
  width:80px;
  padding:10px;
  margin:auto;
  margin-top:20px;
  font-size:10px;
  font-weight:600;
  background:rgba(3, 193, 121, 0.4);
  border:none;
  cursor: pointer;
  &:hover {
      color: #03C179;
  }
`;

export default function RewardsList(){
    const router = useRouter();
    const { fundingcode } = router.query;

    const [reward, setReward] = useState([]);

    useEffect(() => {
        console.log("useEffect RewardsList s")
        axios.get(`http://localhost:8081/funding/rewardsList?fundingcode=${fundingcode}`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
            }
        })
          .then(response => {
            // console.log("api:", response.data)
            console.log('axios - reward')
            console.log(response.data)
            if (Array.isArray(response.data)) {
                setReward(response.data);
            } else if (typeof response.data === 'object') {
                // 객체를 배열로 감싸서 설정
                setReward([response.data]);
            }
          })
          .catch(error => {
              console.log(error);
          });
          
          
        }, [fundingcode]);
    // 날짜 문자열을 원하는 형식으로 변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR');
    }; 

    return(
    <Container>
      {reward.map((present) => (
          <Box key={present.fundingcode}>
            <Con1>
              <Price>{present.price}</Price>
              <Title>{present.title}</Title>
              <Content>{present.content}</Content>
              <DeliveryDate>배송 예정일 : {formatDate(present.delivery)}</DeliveryDate>
              <SupportBtn onClick={() => router.push(`/funding/fundingPledge?fundingcode=${fundingcode}&rewardscode=${present.rewardscode}`)}>
                  후원하기
              </SupportBtn>
            </Con1>  
            </Box>
          ))}
    </Container>
        
    )

}