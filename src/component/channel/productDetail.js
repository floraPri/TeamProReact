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

export default function ProductDetail (){
    return(
      <Container>
        <Fl>
        <Cap src="/assets/images/channel/productDetail.png" />
        <img src="/assets/images/channel/productDetailTbl.png" />
        <img src="/assets/images/channel/productDetailTbl2.png" />
        <img src="/assets/images/channel/productDetailTbl3.png" />
        <img src="/assets/images/channel/productDetailTbl4.png" />
        </Fl>
      </Container>
    )
}