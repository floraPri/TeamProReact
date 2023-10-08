import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 1000px;
`;
const Fl = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Cart (){
    return(
      <Container>
        <Fl>
        <Cap src="/assets/images/mypage/cart.PNG" />
        </Fl>
      </Container>
    )
}