import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import styled from "styled-components";
import axios from "axios";

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;
`;

export default function OrderListPage(){

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        console.log("useEffect 시작");
        
        axios.get(`http://localhost:8081/myPage/orderListPage`)
        .then(response => {
            console.log("api응답: ", response.data);
            if(Array.isArray(response.data)){
                setOrders(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, []);


    return(
        <RightContainer>
            <h3>주문내역</h3>
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
                    {orders.map(order =>
                        <TableRow>
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
        </RightContainer>
    );
}