import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 1600px;
`;

export default function Product (){
    return(
      <Container>
        <Cap src="/assets/images/mypage/product.png" />
      </Container>
    )
}