import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 1000px;
`;

export default function MyPages (){
    return(
      <Container>
        <Cap src="/assets/images/mypage/mypage.PNG" />
        <Link href="/myPage/cart">찜목록  </Link>
        <Link href="/myPage/order">주문목록 </Link>
        <Link href="/myPage/userInfo">내정보 </Link>
      </Container>
    )
}