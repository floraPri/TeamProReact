import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 900px;
`;
const Fl = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Comment (){
    return(
      <Container>
        <Fl>
        <Cap src="/assets/images/channel/comment.png" />
        <img src="/assets/images/channel/commentTbl.png" />
        </Fl>
      </Container>
    )
}