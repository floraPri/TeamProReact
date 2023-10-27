import styled from "styled-components";
import rightStyles from "@/component/myPage/myPRightStyle.module.css";

/**
 * 마이페이지 내 채널 정보 하단에 입력되는 부분
 */



const UlList = styled.ul`
    margin: 20px auto 0;
    width: 100%;
`;

const Li = styled.li`
    padding-bottom: 50px;
`;


export default function MyFeedList(){
    return(
    <div>
        <UlList>
            <Li>
                {/* <div>
                    <h2 className={rightStyles.idWrap}>타이틀 부분</h2>
                </div> */}
                <div className={rightStyles.boxWrap}>
                    <h3 className={rightStyles.titleWrap}>타이틀 부분</h3>
                    <div className={rightStyles.boxWrap2}>
                        <p className={rightStyles.dateTxt}>2023-10-28</p>
                    </div>
                    <p className={rightStyles.txtWrap}>
                            입력한 본문 부분
                    </p>
                    <p>
                        dfdfd 이미지 부분
                    </p>
                </div>
            </Li>
        </UlList>
    </div>
    );
}