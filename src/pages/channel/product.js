import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
`;

const Username = styled.span`
 font-weight:bold;  
`;

const Title = styled.h2`
   font-size :18px; 
   margin-bottom :10px;  
`;
const Image = styled.img`
   width:100%; 
   height:auto; 
   margin-bottom :10px;  
`;
const Price = styled.span`
 font-weight:bold;  
 color:#ff5722 ; 
`;
const Location = styled.span`
 font-weight:bold;  
 color:#ff5722 ; 
`;
const LikeButton = styled.button`
   background-color:#fff ; 
   border:none ; 
   cursor:pointer ; 

    &:hover {
      text-decoration :underline ;
    }
`;
const Button = styled.button`
   background-color:#ff5722 ; 
   border:none ; 
   color:#fff ;
   padding :10px ;
   cursor:pointer ;

    &:hover {
      background-color:#f44336 ;
    }
`;

export default function Product() {

  const [likedProducts, setLikedProducts] = useState([]);

 const handleLikeClick = (product) => {
    if (likedProducts.includes(product)) {
      setLikedProducts(likedProducts.filter((p) => p !== product));
    } else {
      setLikedProducts([...likedProducts, product]);
    }
 };

 const router = useRouter();

 return (
    <Container>
      <Card>
        <Image src="/assets/images/channel/OIP (1).jfif" />
        <Username>rad</Username>
        <Title>iPhone X</Title>
        <Price>25000원</Price>
        <Location>서울시 OO구</Location>
        <LikeButton onClick={() => handleLikeClick("iPhone X")}>
          {likedProducts.includes("iPhone X") ? "Unlike" : "Like"}
        </LikeButton>
      </Card>

      <Card>
        <Image src="/assets/images/channel/OIP (1).jfif" />
        <Username>rad</Username>
        <Title>iPhone</Title>
        <Price>25000원</Price>
        <Location>서울시 OO구</Location>
        <LikeButton onClick={() => handleLikeClick("iPhone")}>
          {likedProducts.includes("iPhone") ? "Unlike" : "Like"}
        </LikeButton>
      </Card>

      <Card onClick={() => router.push('/channel/productDetail') }>
        <Image src="/assets/images/channel/OIP (1).jfif" />
        <Username>rad</Username>
        <Title>타자기</Title>
        <Price>25000원</Price>
        <Location>서울시 OO구</Location>
        <LikeButton onClick={() => handleLikeClick("타자기")}>
          {likedProducts.includes("타자기") ? "Unlike" : "Like"}
        </LikeButton>
      </Card>

      <Button onClick={() => router.push('/channel/editProduct') }>Add Product</Button>

    </Container>   
 );
}