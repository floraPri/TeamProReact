import styled from "styled-components";
import Link from "next/link";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import {Table ,TableCell, TableRow, TableBody, TableHead, TableContainer} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;
`;


export default function Order (){
  
  const [orders, setOrders] = useState([]);
  //const [userno,setUserno] = useState("");

  useEffect(() => {
      console.log("useEffect 시작11111");
      const userNo = localStorage.getItem('userno');
      
      axios.get(`http://localhost:8081/myPage/order?userno=${userNo}`)
      .then(response => {
          console.log("api응답1111111: ", response.data);
          // if(Array.isArray(response.data)){
          //     setOrders(response.data);
          // }
          setOrders(response.data);
      })
      .catch(error => {
          console.log(error);
      })
  }, []); 

    return(
      <Container>
        <MyPagesMenu />
        <RightContainer>
            <h3>주문내역</h3>
            <TableContainer>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>주문번호</TableCell>
                          <TableCell>주문일</TableCell>
                          <TableCell>이미지</TableCell>
                          <TableCell>수량</TableCell>
                          <TableCell>상품명</TableCell>
                          <TableCell>결제금액</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {orders.map((order, index) =>
                          <TableRow key={index}>
                              <TableCell>{order.buycode}</TableCell>
                              <TableCell>{order.buy_date}</TableCell>
                              <TableCell>{order.product_img}</TableCell>
                              <TableCell>{order.amount}</TableCell>
                              <TableCell><Link href="">{order.product_name}</Link></TableCell>
                              <TableCell>{order.pay_price}</TableCell>
                          </TableRow>
                      )}
                  </TableBody>
              </Table>
            </TableContainer>            
        </RightContainer>        
      </Container>
    )
}