import Link from "next/link";
import styled from "styled-components";
import MyPagesMenu from "./myPagesMenu";
import MyPageRight from "./myPageRight";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const Cap = styled.img`
  width: 1000px;
`;

export default function MyPages (){
    return(
      <Container>
        <MyPagesMenu />
        
        <MyPageRight />
      {/**   <div>
        <Link href="/myPage/cart">찜목록  </Link>
        <Link href="/myPage/order">주문목록 </Link>
        <Link href="/myPage/userInfo">내정보 </Link>
        </div> */}
      </Container>
    )
}