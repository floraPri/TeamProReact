import styled from "styled-components";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import MyChannelInfo from "@/component/myPage/myChannelInfo";
import MyFeedList from "./myfeedList";

//내 채널 페이지

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;
    objectFit="cover"
`;

const RightInnerWrap = styled.div`
    width: 960px;
    padding-top: 50px;
`;

export default function MyChannelPage(){
    return(
        <Container>
            <MyPagesMenu />
            <RightContainer>
                <MyChannelInfo />
                <MyFeedList />
            </RightContainer>
        </Container>
    );
}