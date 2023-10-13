import styled from "styled-components";

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

export default function MyFeedList(){
    return(
        <RightContainer>
            <h3>MemberID님의 피드 목록</h3>
            피드목록 띄우기
        </RightContainer>
    )
}