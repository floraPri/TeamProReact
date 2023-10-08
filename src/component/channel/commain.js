import Link from "next/link";
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

export default function Commain (){
    return(
      <Container>
        <Fl>
        <div><Link href="/channel/chat">채팅  </Link></div>
        <div><Link href="/channel/comment">댓글 </Link></div>
        <div><Link href="/channel/follow">팔로우 목록 </Link></div>
        <div><Link href="/channel/product">상품 </Link></div>
        <div><Link href="/channel/productDetail">상품상세페이지 </Link></div>
        <Cap src="/assets/images/channel/commain.png" />
        <img src="/assets/images/channel/commainTbl.png" />
        <img src="/assets/images/channel/commainTbl1.png" />
        <img src="/assets/images/channel/commainTbl2.png" />
        </Fl>
      </Container>
    )
}