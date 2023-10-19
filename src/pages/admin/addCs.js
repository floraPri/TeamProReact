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

const StyledButton = styled(Button)`
  background-color: #D9D9D9;
  color: black;
  font-weight: bold;
`;
export default function AddCs() {

  const [questions, setQuestions] = useState([]);
  const [questionnum, setQuestionnum] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [show, setShow] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const onChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  // 페이지 시작할때 목록 뿌리기
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

  // 수정 누르면 내용 채워지게
  const handleRewrite = (e) => {
    setSelectedQuestion(e);
    setQuestionnum(e.questionnum);
    setTitle(e.title);
    setContent(e.content);
    setCreatedate(e.show);
    setShow(e.show);
    // 화면을 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentDate = new Date(); // 현재 날짜 및 시간 가져오기
  const formattedDate = currentDate.toISOString(); // ISO 8601 형식으로 형식화
  

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    // 수정하기
    if (selectedQuestion) {
      axios.post(`http://localhost:8081/admin/csAdd`, {
        questionnum: selectedQuestion.questionnum,
        title: title,
        content: content,
        createdate: formattedDate,
        show: show
      })
        .then(response => {
          setSelectedQuestion(null);
          setTitle('');
          setContent('');
          setCreatedate('');
          setShow('');
          alert("수정 성공");
          window.location.reload();
        })
        .catch(error => {
          alert("수정 실패");
          console.log(error);
        });
    } else {
      // 등록하기
      axios.post(`http://localhost:8081/admin/csAdd`,{
        questionnum: questionnum,
        title: title,
        content: content
      })
        .then(response => {
          setQuestionnum('');
          setTitle('');
          setContent('');
          alert("등록 성공");
          window.location.reload();
        })
        .catch(error => {
          alert("등록 실패");
          console.log(error);
        });
    }
  };

  // 삭제

  
  const handleRemove = (e) => {
    if (!e.questionnum) {
      console.log("questionnum이 없습니다.");
      return;
    }
    const confirmation = window.confirm("삭제하시겠습니까?");
    if(confirmation){
      axios.put(`http://localhost:8081/admin/csDelete`,{
        questionnum: e.questionnum,
        show: '1'
      })
      
        .then(response => {
          console.log("axios");
          setQuestionnum('');
          setShow('');
          alert("삭제 성공");
          window.location.reload();
        })
        .catch(error => {
          alert("삭제 실패");
          console.log(error);
        });
    } else{
      
    }
  };

  // 취소 버튼
  const handleReset = () => {
    setQuestionnum('');
    setTitle('');
    setContent('');
    setSelectedQuestion(null);
  };

    return(
      <Container>
        <MyLeftMenu />
        <Main>
          <Form method="post" onSubmit={handleSaveUpdate}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>번호</Form.Label>
              <div>{questionnum}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" name="title" value={title} onChange={onChange}/>
            </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={content} onChange={onChange}/>
            </Form.Group>
            <SearchButton type="submit">등록</SearchButton>
            <SearchButton type="button" onClick={handleReset}>취소</SearchButton>
          </Form>
          <StyledAccordion activeKey={questions.map(question => question.questionnum)}>
              <StyledAccordionTopHeader>등록된 리스트</StyledAccordionTopHeader>
              {questions
              .filter(question => question.show === '0') // 필터링: show가 0인 항목만 선택
              .map(question => 
                <StyledAccordionItem key={question.questionnum} eventKey={question.questionnum}>
                    <StyledAccordionHeader>{question.title}</StyledAccordionHeader>
                    <StyledAccordionBody>
                    {question.content}
                    </StyledAccordionBody>
                    <StyledButton type="button" onClick={() => handleRewrite(question)}>수정</StyledButton>
                    <StyledButton type="button" onClick={() => handleRemove(question)}>삭제</StyledButton>
                </StyledAccordionItem >
              )}
          </StyledAccordion>
        </Main>
      </Container>
      
      
    )
}
