import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthToken } from "@/component/user/axios_helper";
import axios from "axios";
import Menubar from "@/component/funding/menubar";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 1000px;
    justify-content: center;
    align-items: center;
    text-align:center;
    `;

const MenuTitle = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:600;
    margin-top:20px;
    margin-bottom:20px;
    padding: 10px 0px 6px 0px;
`;

const ListContainer = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    padding-top: 20px;
    justify-content: center;
    justify-items: center;
    width:900px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;

`;

const FundingContainer = styled.div`
    margin: 5px 5px 5px 5px;
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	width:310px;
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;

const FundingImg = styled.img`
    width:100%;
    height:300px;
    align-items:center;
    justify-content: center;
    object-fit: cover;
`;

const Category = styled.div`
    margin-top:5px;
    margin-bottom:2px;
    font-size:11px;
`;

const Title = styled.div`
    font-weight:600;
    font-size:15px;
`;

const PreContent = styled.div`
    margin-top:1px;
    font-size:12px;
    opacity:0.5;
`;

const Edit = styled.div`
    width:90%;
    height:auto;
    margin: 5px;
    font-size:12px;
    display: flex;
	justify-content: center;
	align-items:center;

    cursor: pointer;
    &:hover {
        background: rgb(3, 193, 121, 0.4);
    }
`;

const Box = styled.div`
    display: grid;
    background: #fff;
    border: 1px solid #e0e0e0;
    padding: 10px;
    margin: 10px 20px 10px 20px;
    width:350px;
    height:250px;
`;

const FundingPrice = styled.div`
  margin: 2px 0; 
  font-size:14px;
  font-weight:600;
`;
const Price = styled.div`
  margin: 8px 0; 
  font-weight:600;
`;

const RewardTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
`;

const Content = styled.div`
  font-size: 14px;
  margin: 8px 0;
`;

const DeliveryDate = styled.div`
  margin: 3px;
  font-size:12px;
`;

const Con1 = styled.div`
  margin:10px;
  margin-bottom:5px;
  padding:10px;
  padding-bottom:5px;
`;
const RewardEdit = styled.button`
  text-align:center;
  justify-content: center;
  width:80px;
  padding:10px;
  margin:auto;
  font-size:11px;
  font-weight:600;
  background:rgba(3, 193, 121, 0.4);
  border:none;
  cursor: pointer;
  &:hover {
      color: #03C179;
  }
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

    // 날짜 형식 변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR');
    };
    // 달성률 계산
    const achievementRate = (nowamount, goalamount) => {
        if (goalamount === 0) {
          throw new Error("0으로 나눌 수 없음");
        }
      
        return Math.round((nowamount / goalamount) * 100);
      }; 

    return (
        <Container>
            <Menubar />
            <MenuTitle> 올린 프로젝트 </MenuTitle>
            <ListContainer>
                {fundings.map((funding) => (
                    <Card key={funding.fundingcode}>  					
                        <FundingContainer onClick={() => router.push(`/funding/fundingDetail?fundingcode=${funding.fundingcode}`)}>
                            <FundingImg src={funding.image} />
                            <Category>{renameCategory(funding.category)}</Category>
                            <Title>{funding.title}</Title>
                            <FundingPrice>{funding.nowamount}원, {achievementRate(funding.nowamount, funding.goalamount)}% 달성</FundingPrice>
                            <PreContent>{funding.precontent}</PreContent>
                        </FundingContainer>
                            <Edit onClick={() => router.push(`/funding/fundingEdit?fundingcode=${funding.fundingcode}`)}> 수정 </Edit>
                        {funding.rewards && funding.rewards.map((present) => (
                            <Box key={present.fundingcode}>
                                <Con1>
                                    <Price>{present.price}원 </Price>
                                    <RewardTitle>{present.title}</RewardTitle>
                                    <Content>{present.content}</Content>
                                    <DeliveryDate>배송 예정일 : {formatDate(present.delivery)}</DeliveryDate>
                                </Con1>
                                <RewardEdit onClick={() => router.push(`/funding/rewardEdit?rewardscode=${present.rewardscode}&fundingcode=${funding.fundingcode}`)}>수정하기</RewardEdit>
                            </Box>
                        ))}      
                    </Card>  
                   ))}
            </ListContainer>    
        </Container>
    );

}