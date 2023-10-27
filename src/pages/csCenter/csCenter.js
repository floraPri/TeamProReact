import styled from "styled-components";
import BootstrapAccordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledAccordion = styled(BootstrapAccordion)`
    margin-top: 20px;
    width: 900px;
    
`;

const StyledAccordionTopHeader = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledAccordionItem  = styled(BootstrapAccordion.Item)`
    border:none;
    border-bottom : 1px solid;

`;

const StyledAccordionHeader = styled(BootstrapAccordion.Header)`
    background-color: #DBFFF1;

    .accordion-button:not(.collapsed) {
        background-color: white;
    }

    .accordion-button:focus {
        box-shadow: none;
    }
`;

const StyledAccordionBody = styled(BootstrapAccordion.Body)`
    background-color: #DBFFF1;

`;

export default function Cscenter() {

  const [questions, setQuestions] = useState([]);
  
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

  return (
    <Container>
        <StyledAccordion>
            <StyledAccordionTopHeader>무엇을 도와드릴까요?</StyledAccordionTopHeader>
            {questions
            .filter(question => question.show === '0') // 필터링: show가 0인 항목만 선택
            .map(question => 
                <StyledAccordionItem key={question.questionnum} eventKey={question.questionnum}>
                    <StyledAccordionHeader>{question.title}</StyledAccordionHeader>
                    <StyledAccordionBody>
                    {question.content}
                    </StyledAccordionBody>
                </StyledAccordionItem >
              )}
        </StyledAccordion>
    </Container>
  )
}
