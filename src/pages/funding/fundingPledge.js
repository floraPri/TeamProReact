import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { getAuthToken } from "@/component/user/axios_helper"

const Container = styled.div`
    display: flex;
    min-width:1280px;
    justify-content: center;
    padding-top: 30px;
    padding-bottom: 30px;
    grid-template-columns: repeat(2, 1fr);
    white-space: pre-line;
`;
const Container2 = styled.div`
    margin-top:20px;
    margin-bottom:20px;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    `;
const Container3 = styled.div`
    padding:10px;
    width:500px;
    margin: 10px;
`;
    
const ImgContainer = styled.img`
    height:100%;
    max-width:400px;
    margin-left:auto;
    margin-right:auto;
    padding:10px;
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
const Rewards = styled.div`
    text-align:center;
`;
const Container4 = styled.div`
    text-align:center;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    margin:10px;
`;

const Category = styled.div`
    text-align:center;
    justify-content: center;
`;
const Title = styled.div`
    text-align:center;
    justify-content: center;
    font-size:24px;
    font-weight:600;
    margin-top:5px;
`;
const Box = styled.div`
    padding:5px;
    margin:5px;
`;

const Bold = styled.div`
    margin: 3px 0px 3px 0px;
    font-size:20px;
    font-weight:500;
`;
const Con1 = styled.div`
  margin:10px;
  padding:10px;
`;

const Price = styled.div`
  margin: 8px 0; 
`;

const Subtitle = styled.div`
  margin: 8px 0;
`;


const DeliveryDate = styled.div`
  margin: 8px 0;
`;
const Input = styled.input`
  width: 500px;
  padding: 5px;
  margin: 0;
`;
const Textarea = styled.textarea`
  width: 500px;
  padding: 5px;
  margin: 0;
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
                const response = axios.post(`http://localhost:8081/funding/contributeFunding`, {
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
                    console.log("bcb");
                    console.log("total :" + nowamount);
                    console.log("bb");
                    alert("후원이 완료되었습니다.");
                    router.push('/funding/funding');
                } else {
                    console.log("aaa");
                    console.error("error response:", response.data);
                }              
        } catch (error) {
            console.error('error : ', error);
        }
    }
    };
    return(
        <Container>
            <div>abcde</div>
            {reward.map((r) => (
          <Box key={r.rewardscode}>
            <Con1>
              <Price>{r.price}</Price>
              <Title>{r.rewardtitle}</Title>
              <Subtitle>{r.rewardsubtitle}</Subtitle>
              <Content>{r.rewardcontent}</Content>
              <DeliveryDate>배송 예정일 : {formatDate(r.delivery)}</DeliveryDate>
            </Con1>
          <form onSubmit={handleSubmit}>
            <div> 수량 입력 </div>
            <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={data.quantity}
                    onChange={handleChange}
                    required />
            <div> 주소 입력 </div>
            <Input
                    type="text"
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    required />
            <div>
                test : {price * data.quantity} </div>
        <SupportBtn type="submit">
            후원하기
        </SupportBtn>
            </form>
            </Box>
              ))}
        </Container>
    )
}