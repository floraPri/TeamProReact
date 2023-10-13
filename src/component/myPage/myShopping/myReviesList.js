import styled from "styled-components";

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

export default function MyReviewList(){
    return(
        <RightContainer>
            <h3>나의 쇼핑 리뷰</h3>
            {/** 내가 쇼핑한 내역에 대한 상품리뷰 */}
            <ul>
                <li>
                    
                </li>
            </ul>
        </RightContainer>
    );
}