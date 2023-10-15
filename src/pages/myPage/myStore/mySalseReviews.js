import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import SalesReviewList from "@/component/myPage/myStore/salesReviewList";

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