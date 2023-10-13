import styled from "styled-components";
import MyPagesMenu from "../myPagesMenu";
import MyReviewList from "./myReviesList";

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