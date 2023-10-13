import styled from "styled-components";
import MyPagesMenu from "../myPagesMenu";
import MyFeedList from "./myFeedList";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;


export default function MyFeeds(){
    return(
        <Container>
            <MyPagesMenu />
            <MyFeedList />
        </Container>
    )
}