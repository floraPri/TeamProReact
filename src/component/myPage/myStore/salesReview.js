import styled from "styled-components";
import MyPagesMenu from "../myPagesMenu";
import SalesReviewList from "./salesReviewList";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;


export default function SalseReviews(){
    return(
        <Container>
            <MyPagesMenu />
            <SalesReviewList />
        </Container>
    );
}