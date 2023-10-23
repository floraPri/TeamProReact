import Link from "next/link";
import styled from "styled-components";
import ResetStyles from "./resetStyles";
import { BsFillPersonFill } from "react-icons/bs";
import menuStyles from "./menuStyles.module.css";
import { useEffect, useState } from "react";

const LeftMenuContain = styled.div`
    width: 240px;
`;


export default function MyPagesMenu(){

    const [email,setEmail] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem('email');

        if(userEmail){
            setEmail(userEmail);
        }
    },[]);

    return(
        <LeftMenuContain>
            <ResetStyles />
            <div className={menuStyles.memberWrap}>
                <span className={menuStyles.spanWrap}>
                    <BsFillPersonFill size="50"/>
                </span>
                <p><span className={menuStyles.memberID_wrap}>{email}</span></p>
            </div>
            <div></div>

            {/*
            <h3 className={menuStyles.h3_title}>나의 피드</h3>
            <ul className={menuStyles.ul_class}>
                 <li><Link href="/myPage/myFeed/feedAdd">피드 등록</Link></li> 
                <li><Link href="/myPage/myFeed/myFeeds">내 피드 목록</Link></li>
            </ul>
            
            <h3 className={menuStyles.h3_title}>나의 상점</h3>
            <ul className={menuStyles.ul_class}>
                <li><Link href="/myPage/myStore/myProduct">내 상품</Link></li>
                <li><Link href="/myPage/myStore/mySales">판매 내역</Link></li>
                <li><Link href="/myPage/myStore/mySalseReviews">판매 리뷰</Link></li>
            </ul>

            <h3 className={menuStyles.h3_title}>나의 쇼핑</h3>
            <ul className={menuStyles.ul_class}>
                <li><Link href="/myPage/myShopping/order">구매 내역</Link></li>
                <li><Link href="/myPage/myShopping/myReviews">내가 쓴 리뷰</Link></li>
            </ul>

            <h3 className={menuStyles.h3_title}><Link href="">지역 인증</Link></h3>

            <h3 className={menuStyles.h3_title}><Link href="/myPage/cart/cart">내가 찜한 상품</Link></h3>


            */}
            <h3 className={menuStyles.h3_title}>내 채널</h3>
            <ul className={menuStyles.ul_class}>
                <li><Link href="">내 채널 정보</Link></li>
                <li><Link href="">팔로워 채널 목록</Link></li>
            </ul>

            <h3 className={menuStyles.h3_title}>나의 피드</h3>
            <ul className={menuStyles.ul_class}>
                 <li><Link href="/myPage/myFeed/feedAdd">피드 등록</Link></li> 
                <li><Link href="/myPage/myFeed/myFeeds">내 피드 목록</Link></li>
            </ul>

            <h3 className={menuStyles.h3_title}>회원 정보</h3>
            <ul className={menuStyles.ul_class}>
                <li><Link href="/myPage/myInfo/userInfo">회원정보 수정</Link></li>
                <li><Link href="">회원 탈퇴</Link></li>
            </ul>

            {/* <h3 className={menuStyles.h3_title}><Link href="">로그아웃</Link></h3> */}
            
        </LeftMenuContain>
    );
}