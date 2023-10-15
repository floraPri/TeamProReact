import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import OrderListPage from "@/component/myPage/myShopping/orderListPage";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;


export default function Order (){
    return(
      <Container>
        <MyPagesMenu />
        <OrderListPage />
      </Container>
    )
}