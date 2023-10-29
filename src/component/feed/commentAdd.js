import styled from "styled-components";
import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/Ai";
import {Table ,TableCell, TableRow, TableBody, Button, TableContainer} from "@mui/material";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";

//로컬스토리지 email가져오는 메서드
 function getUserIdFromLocalStorage(){
    const userid = localStorage.getItem("email");
    return userid;
 }

//로컬스토리 userno 가져오는 메서드
function getUserNoFromLocalStorage(){
    const userno = localStorage.getItem("userno");
    return userno;
}

export default function CommentAdd({feedcode}){
    const router = useRouter();

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
            const response = await axios.post(`http://localhost:8081/feed/commentAdd`,formData);
            
            if(response.status === 200){
                console.log('댓글 데이터가 성공적으로 저장!');
                alert('댓글이 등록되었습니다!');
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
    
    return(
        <div>
            댓글등록 부분 {feedcode}
            <form onSubmit={cmtSave}>
                {/* <input type="hidden" name="feedcode" value={feedcode} id="feedcode" /> */}
                <textarea 
                    name="comment_content" 
                    id="comment_content"
                    onChange={onChange} />
                <Button active="true" type="submit"><AiFillCheckCircle size="20" /></Button>
            </form>
        </div>
    );
}