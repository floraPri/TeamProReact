import styled from "styled-components";
import { FaUserCircle } from "react-icons/Fa";
import { useEffect, useState } from "react";
import rightStyles from "@/component/myPage/myPRightStyle.module.css";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const UlList = styled.ul`
    margin: 20px auto 0;
    width: 100%;
`;

const Li = styled.li`
    margin-bottom: 10px;
`;

const ThumbImage = styled.img`
  width: 250px; 
  height: auto;
`;

export default function FollowList(){
    return(
        <div>
            <h3>팔로워 리스트</h3>
            <UlList>
                <Li>
                    <div className={rightStyles.follwBoxWrap}>
                        <div className={rightStyles.followInner}>
                            <p><FaUserCircle size="60" /></p>
                            <p className={rightStyles.nameTxtWrap}>
                                {/* <span>닉네임</span><br/> */}
                                user닉네임
                            </p>
                            <p className={rightStyles.idTxtWrap}>
                                {/* <span>아이디</span><br/> */}
                                useriddfdfdfd
                            </p>
                            {/* <p><Button variant="contained">팔로우</Button></p> */}
                            <p><Button variant="outlined">팔로우 취소</Button></p>
                        </div>
                    </div>
                </Li>
                <Li>
                    <div className={rightStyles.follwBoxWrap}>
                        <div className={rightStyles.followInner}>
                            <p><FaUserCircle size="60" /></p>
                            <p className={rightStyles.nameTxtWrap}>
                                {/* <span>닉네임</span><br/> */}
                                user닉네임
                            </p>
                            <p className={rightStyles.idTxtWrap}>
                                {/* <span>아이디</span><br/> */}
                                useriddfdfdfd
                            </p>
                            {/* <p><Button variant="contained">팔로우</Button></p> */}
                            <p><Button variant="outlined">팔로우 취소</Button></p>
                        </div>
                    </div>
                </Li>
            </UlList>
        </div>
    );
}