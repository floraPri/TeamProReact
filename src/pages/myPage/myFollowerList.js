import FollowList from "@/component/myPage/followList";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import styled from "styled-components";


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

export default function MyFollowerList(){
    return(
        <Container>
            <MyPagesMenu />
            <RightContainer>
                <FollowList />
            </RightContainer>
        </Container>
    );
}