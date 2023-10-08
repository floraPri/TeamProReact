import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 1800px;
`;

export default function Auction (){
    return(
      <Container>
        <div><Link href="/auction/auctionDetail">상세페이지</Link></div>
        <Cap src="/assets/images/auction/auction.PNG" />
      </Container>
    )
}