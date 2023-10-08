import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 800px;
`;
const Fl = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Follow (){
    return(
      <Container>
        <Fl>
        <Cap src="/assets/images/channel/follow.png" />
        <img src="/assets/images/channel/followTbl1.png" />
        <img src="/assets/images/channel/followTbl2.png" />
        <img src="/assets/images/channel/followTbl3.png" />
        <img src="/assets/images/channel/followTbl4.png" />
        <img src="/assets/images/channel/followTbl5.png" />
        </Fl>
      </Container>
    )
}