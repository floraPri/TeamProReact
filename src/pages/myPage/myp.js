import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import MyPageRight from "@/component/myPage/myPageRight";


const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

export default function MyPages (){

    return(
      <Container>
        <MyPagesMenu />
        <MyPageRight />
      </Container>
    )
}