import styled from "styled-components";
import MyPagesMenu from "../myPagesMenu";
import CartListPage from "./cartList";

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
const Fl = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Cart (){
    return(
      <Container>
        <MyPagesMenu />
        <CartListPage />
      </Container>
    )
}