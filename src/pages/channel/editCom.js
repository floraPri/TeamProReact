import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 500px;
  border: 1px solid #ccc;
  padding: 20px;
`;

const FormGroup = styled.div`
   margin-bottom :10px;  
`;
const Label = styled.label`
   font-weight:bold;  
`;
const Input = styled.input`
   width:100%; 
   padding :5px ; 
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

export default function EditCom() {
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [imageURL, setImageURL] = useState("");

 const handleTitleChange= (e) => {
     setTitle(e.target.value);
 };

 const handleContentChange= (e) => {
     setContent(e.target.value);
 };

 const handleImageURLChange= (e) => {
    setImageURL(e.target.value);
};

 const handleSubmit= (e) => {
     e.preventDefault();

     if(title.trim() && content.trim()){
         console.log("Form submitted:", { title, content, imageURL });

         setTitle("");
         setContent("");
         setImageURL("");
     }
 };

 return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input type="text" value={title} onChange={handleTitleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Content:</Label>
          <textarea value={content} onChange={handleContentChange} />
        </FormGroup>

        <FormGroup>
          <Label>ImageURL:</Label>
          <Input type="text" value={imageURL}  onChange={handleImageURLChange} />
        </FormGroup>

        <Button type="submit">Add Post</Button>
      </Form>   
    </Container>   
 );
}