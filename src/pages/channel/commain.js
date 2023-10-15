import Link from "next/link";
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

export default function commain() {

  const router = useRouter();

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const handleLikeClick = () => {
    setLikes(likes +1);
  };

  const handleCommentSubmit= (e) => {
     e.preventDefault();
     const commentText= e.target.comment.value.trim();

     if(commentText){
         setComments([...comments, commentText]);
         e.target.reset();
     }
 };

 return (
    <Container>
      <PostContainer>
        <PostHeader>
          <Avatar src="/assets/images/channel/1682612008761.png" />
          <Username>rad</Username>
        </PostHeader>
        <Cap src="/assets/images/channel/th.jfif" />
        <div>
           <LikeButton onClick={handleLikeClick}><Avatar src="/assets/images/channel/다운로드.png" /></LikeButton> {likes} 
        </div>
        <PostContent>집 근처에 새로 생긴 분식집 갔었는데, 떡볶이가 엄청 맛있더라구여!</PostContent>
        
        {comments.map((comment, index) => (
           <p key={index}>{comment}</p>
         ))}

         <form onSubmit={handleCommentSubmit}>
            <input type="text" name="comment" placeholder="Add a comment..." />
            <button type="submit">Submit</button>
         </form>
      </PostContainer>

      <Button onClick={() => router.push('/channel/editCom') }>Add Com</Button>

    </Container>
 );
}
