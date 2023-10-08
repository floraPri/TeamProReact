import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 1000px;
`;

export default function Order (){
    return(
      <Container>
        <Cap src="/assets/images/mypage/order.PNG" />
      </Container>
    )
}