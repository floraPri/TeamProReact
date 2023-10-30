import styled from "styled-components";
import rightStyles from "@/component/myPage/myPRightStyle.module.css";
import React from "react";


/**
 * 마이페이지 내 채널 정보 하단에 보이는 내가 등록한 피드
 */



const UlList = styled.ul`
    margin: 20px auto 0;
    width: 100%;
`;

const Li = styled.li`
    margin-bottom: 50px;
`;

const ThumbImage = styled.img`
  width: 250px; 
  height: auto;
`;


export default function MyFeedList({feedData}){
    return(
    <div>
        <UlList>
            {feedData.map((feed, index) => (
            <Li key={index}>
                {/* <div>
                    <h2 className={rightStyles.idWrap}>타이틀 부분</h2>
                </div> */}
                <div className={rightStyles.boxWrap}>
                    <h3 className={rightStyles.titleWrap}>{feed.feedtitle}</h3>
                    <div className={rightStyles.boxWrap2}>
                        <p className={rightStyles.dateTxt}>{feed.feedregdate}</p>
                    </div>
                    <p className={rightStyles.txtWrap}>
                        {feed.feedcontent}
                    </p>
                    <p>
                        <ThumbImage 
                            src={feed.feedimg}
                            alt={feed.feddtitle}
                            />
                    </p>
                </div>
            </Li>
            ))}
        </UlList>
    </div>
    );
}