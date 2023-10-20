import styled from "styled-components";
import rightStyles from "./myPRightStyle.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

const RightInnerWrap = styled.div`
    width: 960px;
    padding-top: 50px;
`;

const RightInnerTitle = styled.div`
    width: 960px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`;

export default function MyPageRight(){
    const [email,setEmail] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem('email');

        if(userEmail){
            setEmail(userEmail);
        }
    },[]);
    return(
        <RightContainer>
            {/** 마이페이지 메인1 */}
            <h3 className={rightStyles.welcomeTitle}><b>{email}</b>님 안녕하세요!</h3>
            <div className={rightStyles.welcomeBox}>
                <p>내가 작성한 게시글<span className={rightStyles.txtNumber}>52</span></p>
                <p>팔로워<span className={rightStyles.txtNumber}>20</span></p>
                <p>팔로잉<span className={rightStyles.txtNumber}>109</span></p>
            </div>

            {/** 마이페이지 내 피드 */}
            <RightInnerWrap>
                <RightInnerTitle>
                    <h3 className={rightStyles.h3_title}>나의 피드</h3> <p><Link href="">더 보기</Link></p>
                </RightInnerTitle>
                <ul className={rightStyles.feedImgWrap}>
                    <li><Link href=""><Image src="/assets/images/mypage/exm_img.jpg" width="300" height="310" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/exm_img.jpg" width="300" height="310" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/exm_img.jpg" width="300" height="310" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/exm_img.jpg" width="300" height="310" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/exm_img.jpg" width="300" height="310" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/exm_img.jpg" width="300" height="310" objectFit="cover" alt="이미지1" /></Link></li>
                </ul>
            </RightInnerWrap>

            {/** 마이페이지 내가 등록한 상품  */}
            <RightInnerWrap>
                <RightInnerTitle>
                    <h3 className={rightStyles.h3_title}>나의 상품</h3> <p><Link href="">더 보기</Link></p>
                </RightInnerTitle>
                <ul className={rightStyles.productImgWrap}>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                </ul>
            </RightInnerWrap>

            {/** 찜하기 상품  */}
            <RightInnerWrap>
                <RightInnerTitle>
                    <h3 className={rightStyles.h3_title}>찜 하기</h3> <p><Link href="">더 보기</Link></p>
                </RightInnerTitle>
                <ul className={rightStyles.productImgWrap}>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                    <li><Link href=""><Image src="/assets/images/mypage/thumb_img.jpg" width="180" height="180" objectFit="cover" alt="이미지1" /></Link></li>
                </ul>
            </RightInnerWrap>

            {/** 거래후기  */}
            <RightInnerWrap>
                <RightInnerTitle>
                    <h3 className={rightStyles.h3_title}>거래 후기</h3> <p><Link href="">더 보기</Link></p>
                </RightInnerTitle>
                <ul className={rightStyles.reviewUlWrap}>
                    <li>
                        <div className={rightStyles.reviewProductImg}>
                            <Image src="/assets/images/mypage/thumb_img.jpg" width="160" height="160" objectFit="cover" alt="이미지1" />
                        </div>
                        <div className={rightStyles.reviewWrap}>
                            <h2 className={rightStyles.h2Title}>바이오더마 센시비오 H2O</h2>
                            <p className={rightStyles.reviewTxt}>
                                <Link href="">
                                    쿨거래 감사합니다~^^ 좋은 가격에 상품도 새거라 넘 좋아요~
                                    앞으로 번창하세요~ ...........
                                </Link>
                            </p>
                            <span>eikdfeke 님</span>
                        </div>    
                    </li>

                    <li>
                        <div className={rightStyles.reviewProductImg}>
                            <Image src="/assets/images/mypage/thumb_img.jpg" width="160" height="160" objectFit="cover" alt="이미지1" />
                        </div>
                        <div className={rightStyles.reviewWrap}>
                            <h2 className={rightStyles.h2Title}>바이오더마 센시비오 H2O</h2>
                            <p className={rightStyles.reviewTxt}>
                                <Link href="">
                                    쿨거래 감사합니다~^^ 좋은 가격에 상품도 새거라 넘 좋아요~
                                    앞으로 번창하세요~ ...........
                                </Link>
                            </p>
                            <span>eikdfeke 님</span>
                        </div>    
                    </li>

                    <li>
                        <div className={rightStyles.reviewProductImg}>
                            <Image src="/assets/images/mypage/thumb_img.jpg" width="160" height="160" objectFit="cover" alt="이미지1" />
                        </div>
                        <div className={rightStyles.reviewWrap}>
                            <h2 className={rightStyles.h2Title}>바이오더마 센시비오 H2O</h2>
                            <p className={rightStyles.reviewTxt}>
                                <Link href="">
                                    쿨거래 감사합니다~^^ 좋은 가격에 상품도 새거라 넘 좋아요~
                                    앞으로 번창하세요~ ...........
                                </Link>
                            </p>
                            <span>eikdfeke 님</span>
                        </div>    
                    </li>
                </ul>
            </RightInnerWrap>            

        </RightContainer>
    );
}