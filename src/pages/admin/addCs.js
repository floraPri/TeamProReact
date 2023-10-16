import styled from "styled-components";
import MyLeftMenu from "@/component/admin/myLeftMenu";
import {Accordion, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "@mui/material";
import React, { useState, useEffect} from "react";
import axios from "axios";

const Container = styled.div`
  width: 1280px;
  height: 100%;
  display: flex;
  margin: 0 auto;
`;

const Main = styled.div`
  margin-left: 50px;
  margin-top: 30px;
  width: 100%;
`;

const StyledAccordion = styled(Accordion)`
    margin-top: 20px;
    width: 900px;
    
`;

const StyledAccordionTopHeader = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledAccordionItem  = styled(Accordion.Item)`
    border:none;
    border-bottom : 1px solid;

`;

const StyledAccordionHeader = styled(Accordion.Header)`
    background-color: #DBFFF1;

    .accordion-button:not(.collapsed) {
        background-color: white;
    }

    .accordion-button:focus {
        box-shadow: none;
    }
`;

const StyledAccordionBody = styled(Accordion.Body)`
    background-color: #DBFFF1;

`;

const SearchButton = styled(Button)`
  background-color: #D9D9D9;
  color: black;
  font-weight: bold;
`;

export default function AddCs() {

  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  const saveCs = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    axios.post(`http://localhost:8081/admin/add`,{
      title: title,
      content: content
    })
      .then(response => {
        setTitle('');
        setContent('');
        alert("등록 성공")
        console.log("axios")
      })
      .catch(error => {
        alert("등록 실패")
        console.log(error);
      });
    }

  useEffect(() => {
    console.log("useEffect 시작")
    axios.get(`http://localhost:8081/admin/addCs`)
      .then(response => {
        console.log("api응답:", response.data)
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  

    return(
      <Container>
        <MyLeftMenu />
        <Main>
          <Form method="post" onSubmit={saveCs}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" name="title" value={title} onChange={onChange}/>
            </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={content} onChange={onChange}/>
            </Form.Group>
            <SearchButton type="submit">등록</SearchButton>
          </Form>
          <StyledAccordion>
              <StyledAccordionTopHeader>등록된 리스트</StyledAccordionTopHeader>
              {questions.map(question => 
                <StyledAccordionItem key={question.questionnum} eventKey={question.questionnum}>
                    <StyledAccordionHeader>{question.title}</StyledAccordionHeader>
                    <StyledAccordionBody>
                    {question.content}
                    </StyledAccordionBody>
                </StyledAccordionItem >
              )}
          </StyledAccordion>
        </Main>
      </Container>
      
      
    )
}
