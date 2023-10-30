import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthToken } from "@/component/user/axios_helper";
import axios from "axios";
import Menubar from "@/component/funding/menubar";

const Container = styled.div`
    display: flex;
    min-width: 1000px;
    justify-content: center;
    align-items: center;
    text-align:center;
    padding-top: 30px;
    padding-bottom: 30px;
    flex-direction: column;
    `;
    
const ListContainer = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    padding-top: 20px
    justify-content: center;
    width:90%;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;  // 이 부분은 세로 방향으로 아이템들을 배열하려는 경우에 추가합니다.
    align-items:center;

`;

const FundingContainer = styled.div`
    margin: 5px 5px 5px 5px;
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	width:270px;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;

const FundingImg = styled.img`
    width:100%;
    width:250px;
    height:auto;
    align-items:center;
    justify-content: center;
`;

const Category = styled.div`
    margin-top:5px;
    font-size:10px;
    
`;

const Title = styled.div`
    font-weight:600;
    font-size:12px;
`;

const PreContent = styled.div`
    margin-top:5px;
    font-size:10px;
    color:lightgrey;
    opacity:0.9;
`;

const Edit = styled.div`
    width:90%;
    margin: 5px;
    display: flex;
	justify-content: center;
	align-items:center;

    cursor: pointer;
    &:hover {
        background: #03C179;
    }
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin: 10px;
`;

const Price = styled.div`
  margin: 8px 0; 
`;

const RewardTitle = styled.div`
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

    export default function MyOrganizeList(){
        const router = useRouter();
        const [fundings, setFundings] = useState([]);
    
        useEffect(() => {
            const userno = localStorage.getItem('userno');
            axios.get(`http://localhost:8081/funding/myOrganizeList?userno=${userno}`, {
                headers: {
                    Authorization: `Bearer ${(getAuthToken())}`
                }
            })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setFundings(response.data);
        
                    response.data.forEach(funding => {
                        const currentFundingCode = funding.fundingcode;
                        if (currentFundingCode) {
                            axios.get(`http://localhost:8081/funding/rewardsList?fundingcode=${currentFundingCode}`,{
                                headers: {
                                    Authorization: `Bearer ${(getAuthToken())}`
                                }
                            })
                            .then(rewardResponse => {
                                setFundings(prevFundings => {
                                    return prevFundings.map(prevFunding => {
                                        if(prevFunding.fundingcode === currentFundingCode) {
                                            return {
                                                ...prevFunding,
                                                rewards: Array.isArray(rewardResponse.data) ? rewardResponse.data : [rewardResponse.data]
                                            };
                                        }
                                        return prevFunding;
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        }
                    });
                }
            })
            .catch(error => console.log(error));
        }, []);

        
    const renameCategory = (category) => {
        switch (category) {
            case 'stationery':
            return '문구';
            case 'book':
            return '출판';
            case 'game':
            return '게임';
            case 'living':
            return '리빙';
            case 'pet':
            return '반려동물';
            default:
            return category;
        }
    }

    // 날짜 문자열을 원하는 형식으로 변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR');
    };
    const achievementRate = (nowamount, goalamount) => {
        if (goalamount === 0) {
          throw new Error("0으로 나눌 수 없음");
        }
      
        return Math.round((nowamount / goalamount) * 100);
      }; 

    return (
        <Container>
            <Menubar />
            <Title>MyOrganizeList</Title>
            <ListContainer>
                {fundings.map((funding) => (
                    <Card key={funding.fundingcode}>  					
                        <FundingContainer onClick={() => router.push(`/funding/fundingDetail?fundingcode=${funding.fundingcode}`)}>
                            <FundingImg src={funding.image} />
                            <Category>{renameCategory(funding.category)}</Category>
                            <Title>{funding.title}</Title>
                            <Price>{funding.nowamount}원, {achievementRate(funding.nowamount, funding.goalamount)}% 달성</Price>
                            <PreContent>{funding.precontent}</PreContent>
                        </FundingContainer>
                            <Edit onClick={() => router.push(`/funding/fundingEdit?fundingcode=${funding.fundingcode}`)}>edit</Edit>
                        {funding.rewards && funding.rewards.map((present) => (
                            <Box key={present.fundingcode}>
                                <Con1>
                                    <Price>{present.price}</Price>
                                    <RewardTitle>{present.title}</RewardTitle>
                                    <Content>{present.content}</Content>
                                    <DeliveryDate>배송 예정일 : {formatDate(present.delivery)}</DeliveryDate>
                                </Con1>
                                <Edit onClick={() => router.push(`/funding/rewardEdit?rewardscode=${present.rewardscode}&fundingcode=${funding.fundingcode}`)}>수정하기</Edit>
                            </Box>
                        ))}      
                    </Card>  
                   ))}
            </ListContainer>    
        </Container>
    );

}