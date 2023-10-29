import styled from "styled-components";
import * as React from 'react';
import feedStyles from "@/component/feed/feedStyles.module.css";

const ProfileWrap = styled.div`
    margin: 20px auto 0;
    width: 600px;
    height: 160px;
    background: #03C179;
`;

export default function FeedProfileHeader({userid}){
    return(
        <ProfileWrap>
            <div className={feedStyles.topWrap}>
            <h3>{userid}</h3>
            <div className={feedStyles.boxWarp}>
                <div className={feedStyles.innerBox}>
                    <p>
                        게시물<br/>
                        <span className={feedStyles.spanTxt}>000</span>
                    </p>
                </div>
                <div className={feedStyles.innerBox}>
                    <p>
                        팔로워<br/>
                        <span className={feedStyles.spanTxt}>000</span>
                    </p>
                </div>
                <div className={feedStyles.innerBox}>
                    <p>
                        팔로잉<br/>
                        <span className={feedStyles
                            .spanTxt}>000</span>
                    </p>
                </div>
            </div>
        </div>
        </ProfileWrap>
    );
}