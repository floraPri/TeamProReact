import styled from "styled-components";
import MyLeftMenu from "./myLeftMenu";
import {Accordion, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

export default function AddCs (){
    return(
      <Container>
        <MyLeftMenu />
        <Main>
          <Form action="/admin/addCs" method="post">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">등록</Button>
          </Form>
          <StyledAccordion>
              <StyledAccordionTopHeader>등록된 리스트</StyledAccordionTopHeader>
              <StyledAccordionItem eventKey="0">
                  <StyledAccordionHeader>주문 내역은 어떻게 확인할 수 있나요?</StyledAccordionHeader>
                  <StyledAccordionBody>
                  우측 상단 프로필 사진을 클릭 후 [나의쇼핑]을 통해 확인 가능합니다
                  </StyledAccordionBody>
              </StyledAccordionItem >
              <StyledAccordionItem  eventKey="1">
                  <StyledAccordionHeader>제품의 자세한 정보는 어떻게 알 수 있나요?</StyledAccordionHeader>
                  <StyledAccordionBody>
                  각 제품의 상세 페이지에서 확인 가능하며, 
                  더욱 자세한 정보는 제품상세페이지 내 문의하기를 통해 판매 업체에 문의 가능합니다.
                  </StyledAccordionBody>
              </StyledAccordionItem >
          </StyledAccordion>
        </Main>
      </Container>
      
      
    )
}