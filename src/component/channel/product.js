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

export default function Product (){
    return(
      <Container>
        <Fl>
        <Cap src="/assets/images/channel/product.png" />
        <img src="/assets/images/channel/productTbl.png" />
        </Fl>
      </Container>
    )
}