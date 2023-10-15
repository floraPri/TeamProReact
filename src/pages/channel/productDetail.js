import styled from "styled-components"
import React, { useState } from "react";
import { useRouter } from "next/router";

const Cap = styled.img`
  width: 300px;
`;
const Fl = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left :150px;  
`;

const PostContainer = styled.div`
  width: 600px;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PostHeader = styled.div`
  display: flex;
`;

const Avatar = styled.img`
   width:50px; 
   height:auto; 
   border-radius:50%; 
   margin-right :10px;  
`;
const Username = styled.span`
 font-weight:bold;  
`;

const PostContent = styled.p``;


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

const Price = styled.span`
 font-weight:bold;  
`;
const Location = styled.span`
 font-weight:bold;  
`;

const Title = styled.h2`
   font-size :18px; 
   margin-bottom :10px;  
`;

const LikeButton = styled.button`
   background-color:#fff ; 
   border:none ; 
   cursor:pointer ; 

    &:hover {
      text-decoration :underline ;
    }
`;

export default function commain() {

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const handleLikeClick = () => {
    setLikes(likes +1);

  };


 return (
    <Container>
      <PostContainer>
        <PostHeader>
          <Avatar src="/assets/images/channel/1682612008761.png" />
          <Username>rad</Username>
        </PostHeader>
        <Title>타자기 팔아요!!!</Title>
        <Cap src="/assets/images/channel/OIP (1).jfif" />
        <Price>25000원</Price>
        <PostContent>몇번 안쓴 타자기 팔아요!</PostContent>
        <Location>서울시 OO구</Location>
        
        {comments.map((comment, index) => (
           <p key={index}>{comment}</p>
         ))}

        <div>
          <LikeButton onClick={handleLikeClick}><Avatar src="/assets/images/channel/다운로드.png" /></LikeButton> {likes} 
        </div>
      </PostContainer>

      <Button>구매하기(채팅)</Button>

    </Container>
 );
}
