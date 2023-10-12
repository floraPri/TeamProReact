import styled from "styled-components";
import MyPagesMenu from "./myPagesMenu";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const Cap = styled.img`
  width: 1000px;
`;

export default function Order (){
    return(
      <Container>
        <MyPagesMenu />
        주문내역 페이지
        
      </Container>
    )
}