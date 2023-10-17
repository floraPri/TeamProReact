import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import MyReviewList from "@/component/myPage/myShopping/myReviesList";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;


export default function MyReview(){
    return(
        <Container>
            <MyPagesMenu />
            <MyReviewList />
        </Container>
    )
}