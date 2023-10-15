import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import MyFeedForm from "@/component/myPage/myFeed/myFeedForm";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

//피드 등록
export default function MyFeedAdd(){
    return(
        <Container>
            <MyPagesMenu />
            <MyFeedForm />
        </Container>
    );
}