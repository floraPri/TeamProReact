import styled from "styled-components";

//내 채널 페이지

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;
export default function MyChannelPage(){
    return(
        <Container>
            <MyPagesMenu />
            
        </Container>
    );
}