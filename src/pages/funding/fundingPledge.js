import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper";
import Menubar from "@/component/funding/menubar";


const Container = styled.div`
    display: grid;
    justify-content: center;
    text-align: center;
    padding: 20px 0;
    `;
const MenuTitle = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:600;
    margin-top:20px;
    margin-bottom:20px;
    padding: 10px 0px 6px 0px;
`;
    
const SupportBtn = styled.button`
    text-align:center;
    justify-content: center;
    width:100px;
    padding:10px;
    margin:auto;
    margin-top:20px;
    font-size:14px;
    font-weight:600;
    border: none;
    background:rgba(3, 193, 121, 0.4);
    cursor: pointer;
    &:hover {
        color: #03C179;
    }
`;
const Content = styled.div`
    text-align:center;
`;

const Title = styled.div`
    text-align:center;
    justify-content: center;
    font-size:16px;
    font-weight:600;
    margin-top:5px;
    margin-bottom:5px;
`;
const SubTitle = styled.div`
    text-align:center;
    justify-content: center;
    font-size:15px;
    font-weight:600;
    margin-top:35px;
    margin-bottom:5px;
`;
const Box = styled.div`
    padding:5px;
    margin:5px;
`;

const FundingContainer = styled.div`
    display:flex;
    flex-direction: column;
    padding-left:80px;
    padding-right:80px;
    padding-top:30px;
    padding-bottom:30px;

`;
const Category = styled.div`
    margin-top:5px;
    text-align:center;
    font-weight:600;
    justify-content: center;
`;
const FundingTitle = styled.div`
    text-align:center;
    justify-content: center;
    font-size:24px;
    font-weight:600;
    margin-top:5px;

`;
const ImgContainer = styled.img`
    width:400px;
    padding:10px;
`;
const PreContent = styled.div`
    margin-top:5px;
    margin-bottom:15px;
    padding:5px;
    font-size:14px;
    font-weight:500;
    `;
const RewardContainer = styled.div`
    display:flex;
    flex-direction: column;
    margin:10px;
    border-top: 0.6px solid rgb(194, 194, 194, 0.6);

    width:60%;
`;

const Price = styled.div`
    text-align:center;
    font-size: 16px;
    font-weight:700;
    margin-top:5px;
`;

const DeliveryDate = styled.div`
    text-align:right;
    margin: 8px 0;
    padding-right:5px;
    font-size:10px;
    font-color:grey;
`;
const Input = styled.input`
  width: 500px;
  padding: 5px;
  border:none;
`;
const InputCss = styled.div`
  margin: 0;
  border-bottom: 0.6px solid rgb(194, 194, 194, 0.6);
  padding:10px;
`;

const AchievementRate = styled.div`
    text-align:center;
    font-weight:600;
    font-size:12px;
    opacity:0.9;
    
`;
const Text = styled.div`
    margin: 3px 0px 3px 0px;
    font-size:10px;
`;
const Con1 = styled.div`
    text-align:center;
    cursor: pointer;
    &:hover {
        color: rgb(3,193,121, 0.6);
    }

`;
const Result = styled.div`
    text-align:right;
    font-size:9px;
    font-weight:500;
    padding-left:10px;
    padding-top:10px;

`;

const VerticalAlignContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // 가로 중앙 정렬
    padding: 20px;
    // background:rgb(216, 230, 224, 0.4);
`;
const ButtonCenter = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export default function FundingPledge() {

    const router = useRouter();
    const { rewardscode } = router.query;
    const { fundingcode } = router.query;

    const [reward, setReward] = useState([]);
    const [price, setPrice] = useState('');

    const [data, setData] = useState({
        fundingcode:"",
        rewardscode:"",
        userno:"",
        quantity: 0,
        address: "",
        // price: 0,
        nowamount: 0,
    });

    useEffect(() => {
        console.log("useEffect pledge start")
        axios.get(`http://localhost:8081/funding/fundingPledge?fundingcode=${fundingcode}&rewardscode=${rewardscode}`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
            }
        })
          .then(response => {
            // console.log("api:", response.data)
            console.log('axios - reward')
            console.log(fundingcode, rewardscode)
            console.log(response.data)
            if (Array.isArray(response.data)) {
                console.log("2");
                setReward(response.data);
                setPrice(response.data.price);
            } else if (typeof response.data === 'object') {
                console.log("2");
                // 객체를 배열로 감싸서 설정
                setReward([response.data]);
                setPrice(response.data.price);
            }
          })
          .catch(error => {
            console.log(fundingcode, rewardscode);
              console.log(error);
          });
          
          
        }, [rewardscode]);
    // 날짜 문자열을 원하는 형식으로 변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR');
    }; 
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
    const achievementRate = (nowamount, goalamount) => {
        if (goalamount === 0) {
          throw new Error("0으로 나눌 수 없음");
        }
      
        return Math.round((nowamount / goalamount) * 100);
      }; 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e, r) => {
        e.preventDefault();
        const userno = localStorage.getItem('userno');
        console.log('data.quantity', data.quantity);
        const totalAmount = price * data.quantity; // totalAmount 계산
            setData((prevData) => ({
                ...prevData,
                nowamount: totalAmount, // nowamount 값을 totalAmount로 설정
            }));
        const confirmed = window.confirm("후원을 진행하시겠습니까?");
        
        if (confirmed) {
            // const totalAmount = r.price * data.quantity;
            console.log('total', totalAmount);
            try{
                const response = await axios.post(`http://localhost:8081/funding/contributeFunding`, {
                        fundingcode: fundingcode,
                        rewardscode: rewardscode,
                        userno: userno,
                        quantity: data.quantity,
                        address: data.address,
                        nowamount: totalAmount,
                    },{
                        headers: {
                            Authorization: `Bearer ${(getAuthToken())}`,
                        }
                    });
                if(response.status === 200){
                    console.log("success");
                    alert("후원이 완료되었습니다.");
                    router.push(`/funding/myFunding/myPledges`);
                } else {
                    console.error("error response:", response.data);
                }              
        } catch (error) {
            console.error('error : ', error);
        }
    }
    };
    return(
        <Container>
        <Menubar/>
        <MenuTitle> 후원하기 </MenuTitle>
            {reward.map((r) => (
          <Box key={r.rewardscode}>
            <VerticalAlignContainer>
            <FundingContainer onClick={() => router.push(`/funding/fundingDetail?fundingcode=${r.fundingcode}`)}>
                <SubTitle> 펀딩 </SubTitle>
            <ImgContainer src={r.image}/><Con1>
            <Category> {renameCategory(r.category)} </Category>
            <Text>{formatDate(r.startdate)} ~ {formatDate(r.enddate)}</Text>
            <FundingTitle>{r.title}</FundingTitle>
            <AchievementRate>{r.nowamount}원, {achievementRate(r.nowamount, r.goalamount)}% 달성</AchievementRate>
            <PreContent> {r.precontent} </PreContent>
            
            </Con1>
            </FundingContainer>  


            <RewardContainer>
                <SubTitle> 후원 리워드 </SubTitle>
              <Price>{r.price}원 </Price>
              <Title>{r.rewardtitle}</Title>
              <Content>{r.rewardcontent}</Content>
            </RewardContainer>
          <form onSubmit={handleSubmit}>
              <DeliveryDate>배송 예정일 : {formatDate(r.delivery)}</DeliveryDate>
            <InputCss> 수량 &nbsp;
                <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={data.quantity}
                    onChange={handleChange}
                    required /></InputCss>
            <InputCss> 주소 &nbsp;
                <Input
                    type="text"
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    required /> </InputCss>
           
            <Result>{data.quantity}개, {price * data.quantity}원 후원합니다. <br/>
                    펀딩 성공 시 {formatDate(r.enddate)} 익일 결제</Result>
        <ButtonCenter>
        <SupportBtn type="submit">
            후원하기
        </SupportBtn>
        </ButtonCenter>
            </form>
            </VerticalAlignContainer>
            </Box>
              ))}
        </Container>
    )
}