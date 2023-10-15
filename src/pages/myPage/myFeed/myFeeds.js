import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import MyFeedList from "@/component/myPage/myFeed/myFeedList";

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