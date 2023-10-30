import styled from "styled-components";
import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/Ai";
import {Table ,TableCell, TableRow, TableBody, Button, TableContainer} from "@mui/material";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import feedStyles from "@/component/feed/feedStyles.module.css";
import { getAuthToken } from "../user/axios_helper";



//로컬스토리지 email가져오는 메서드
 function getUserIdFromLocalStorage(){
    const userid = localStorage.getItem("email");
    return userid;
 }

//로컬스토리지 userno 가져오는 메서드
function getUserNoFromLocalStorage(){
    const userno = localStorage.getItem("userno");
    return userno;
}



export default function CommentAdd({feedcode}){
    const router = useRouter();

    const [isFocused, setFocused] = useState(false);

    // 로컬 스토리지에 token값이 없는 경우(로그아웃 상태일때)
    // textarea영역에 포커싱 했을때 로그인 요청 하게끔 하는 메서드
    function isStoragToken(){
        const token = localStorage.getItem("auth_token");

        if(!token && !isFocused){
            alert('로그인 필요');
            setFocused(true);
            window.location.href="/";
            return false;
        }
        return true;
    }

    //댓글 등록부분
    const [cmtData, setCmtData ] = useState({
        feedcode : feedcode,
        writer : "",
        comment_content : "",
        userno: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setCmtData((prevData) => ({
            ...prevData,
        [name]: value,
        }));
    }

    //버튼을 누르면 댓글 등록
    const cmtSave = async (e) => {
        e.preventDefault();

        //텍스트 필드 영역이 빈값인지 체크하기--> 문제
        // if(!inputChk()){
        //     return;
        // }

        const userno = getUserNoFromLocalStorage();
        const userid = getUserIdFromLocalStorage();

        const formData = new FormData();
        formData.append("feedcode",feedcode);
        formData.append("writer",userid);
        formData.append("userno",userno);
        formData.append("comment_content",cmtData.comment_content);

        console.log("피드번호: "+feedcode);
        console.log("writer : "+ userid);
        console.log("userno : "+ userno);
        console.log("작성한 댓글 : "+cmtData.comment_content);

        try{
            const response = await axios.post(`http://localhost:8081/feed/commentAdd`, formData , {
                headers: {
                    Authorization : `Bearer ${(getAuthToken())}`,
                }
            });
            
            if(response.status === 200){
                console.log('댓글 데이터가 성공적으로 저장!');
                alert('댓글이 등록되었습니다!');
                setCmtData((prevData) => ({
                    ...prevData,
                    comment_content: "", // 입력 필드를 빈 문자열로 설정
                }));
                window.location.reload();
                // 입력 필드 초기화
                // setCmtData((prevData) => ({
                //     ...prevData,
                //     comment_content: "", // 입력 필드를 빈 문자열로 설정
                // }));
                //router.push('/feed/feedPage');
            } else {
                console.error('댓글 데이터 저장 오류 발생');
            }
        } catch(error){
            console.error('댓글등록 에러 : ', error);
        }
        // 등록후 ... input 입력값 초기화..
        document.getElementById("comment_content").value=" ";
    };

    //댓글창 빈값여부 체크
    function inputChk(){
        const cmtContent = document.getElementById("comment_content");
        const cmtValue = cmtContent.value;
        if(!cmtValue){
            alert("댓글을 작성해주세요!");
            cmtContent.focus();
            return false;
        }
        return true;
    }

    return(
        
        <div className={feedStyles.feedAddWrap}>
            {/* 댓글등록 부분 {feedcode} */}
            <form onSubmit={cmtSave}>
                {/* <input type="hidden" name="feedcode" value={feedcode} id="feedcode" /> */}
                {/* <textarea 
                    name="comment_content" 
                    id="comment_content"
                    onChange={onChange} /> */}

            <TextField
                id="comment_content"
                name="comment_content"
                multiline
                onChange={onChange}
                onFocus={isStoragToken}
                variant="standard"
                width="20"
                placeholder="댓글 입력"
                sx={{ width: "100%" }}
            />
            <div className={feedStyles.cmtAddBtnWrap}>
                <Button active="true" type="submit" width="20">
                    <AiFillCheckCircle size="20" />
                </Button>
            </div>
                
            </form>
        </div>
    );
}