import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`

`;

const Fl = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Chat (){
    return(
      <Container>
        <Fl>
        <Cap src="/assets/images/channel/chat.png" />
        <img src="/assets/images/channel/chatTbl1.png" />
        <img src="/assets/images/channel/chatTbl2.png" />
        </Fl>
      </Container>
    )
}