import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import MyPagesMenu from "@/component/myPage/myPagesMenu";
import rightStyles from "@/component/myPage/myPRightStyle.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";
import {Table ,TableCell, TableRow, TableBody, Button, TableContainer} from "@mui/material";
import ApiService from "./ApiService";
import { useRouter } from "next/router";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;
    objectFit="cover"
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

const ThumbImage = styled.img`
  width: 250px; 
  height: auto;
`;

const Input = styled.input`
  width: 500px;
  padding: 5px;
  margin: 0;
`;

const Textarea = styled.textarea`
  width: 500px;
  padding: 5px;
  margin: 0;
`;

const FileInput = styled.input`
`;

const cellStyle = {
    border: 'none',
    align: 'center', 
  };

  function getUserNoFromLocalStorage(){
    const userno = localStorage.getItem("userno");
    return userno;
}
// 피드 수정
export default function FeedEditPage (){
    const router = useRouter();

    const [userno,setUserno] = useState("");
    const [email,setEmail] = useState("");
    const [feeds,setFeeds] = useState({
        feedcode: ' ',
        feedtitle: ' ',
        feedcontent: ' ',
        image: null,
        feedregdate: '',
        userno : '',
    });
    
  useEffect(() => {
    const userNo = localStorage.getItem('userno');
    const userEmail = localStorage.getItem('email');
    
    //피드 상세정보 불러오기!!
    ApiService.fetchFeedById(localStorage.getItem("feedcode"))
        .then((response) => {
            const data = response.data;
            setFeeds({
                feedcode: data.feedcode,
                feedtitle: data.feedtitle,
                feedcontent: data.feedcontent,
                feedimg: data.feedimg,
                feedregdate: data.feedregdate,
                userno : data.userno,
            });
        })
        .catch(err => {
            console.log("loadFeedEditPage() error!!!",err);
        });

    if(userEmail){
      setEmail(userEmail);
    }
  },[]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFeeds((prevData) => ({
          ...prevData,
          [name]: type === "file" ? files[0] : value,
        }));
    };

    const editSubmit = async (e) => {
        e.preventDefault();
        const userno = getUserNoFromLocalStorage();

        const formData = new FormData();
        formData.append("feedcode",feeds.feedcode);
        formData.append("feedtitle",feeds.feedtitle);
        formData.append("feedcontent",feeds.feedcontent);
        formData.append("image",feeds.image);
        formData.append("userno",userno);

        console.log("수정된 타이틀 : ",feeds.feedcode);
        console.log("수정된 타이틀 : ",feeds.feedtitle);
        console.log("수정된 본문내용 : ",feeds.feedcontent);
        console.log("수정된 이미지 : ",feeds.image);
        console.log("userno : ",userno);
        
        // 수정 업데이트
        try {
            const response = await axios.post('http://localhost:8081/myPage/feedEditPage', formData, {
                headers: {
                Authorization : `Bearer ${(getAuthToken())}`,
                  'Content-Type': 'multipart/form-data'
                }
              });

              if (response.status === 200) {
                console.log('피드가 성공적으로 수정되었습니다.');
                router.push('/myPage/myp');
              } else {
                console.error('수정 중 오류 발생!!!!!!');
              }            
            } catch(error){
                console.error("피드 수정 중 오류 발생: ", error);
        }

    };

  return(
    <Container>
      <MyPagesMenu />
      <RightContainer>
        {/** 피드 수정 페이지 메인1 */}
        <h3 className={rightStyles.welcomeTitle}><b>{email}</b>님 안녕하세요!</h3>
        <div className={rightStyles.welcomeBox}>
            <p>내가 작성한 게시글<span className={rightStyles.txtNumber}>52</span></p>
            <p>팔로워<span className={rightStyles.txtNumber}>20</span></p>
            <p>팔로잉<span className={rightStyles.txtNumber}>109</span></p>
        </div>

            {/** 피드 수정 페이지 내 피드 */}
            <RightInnerWrap>
                <RightInnerTitle>
                    <h3 className={rightStyles.h3_title}>피드 수정</h3>
                </RightInnerTitle>
                <form encType="multipart/form-data" onSubmit={editSubmit}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>피드번호</TableCell>
                                <TableCell>{feeds.feedcode}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>게시물 작성자(아이디)</TableCell>
                                <TableCell>{email}</TableCell>
                                {/**email이 사실상 아이디->로컬스토리지에서 가져옴 */}
                            </TableRow>
                            <TableRow>
                                <TableCell>게시물 작성일</TableCell>
                                <TableCell>{feeds.feedregdate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>제목</TableCell>
                                <TableCell>
                                    <Input 
                                        type="text" 
                                        id="feedtitle" 
                                        name="feedtitle"
                                        value={feeds.feedtitle}
                                        onChange={handleChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>내용</TableCell>
                                <TableCell>
                                    <Textarea 
                                        id="feedcontent" 
                                        name="feedcontent"
                                        value={feeds.feedcontent}
                                        onChange={handleChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>이미지</TableCell>
                                <TableCell>
                                    <Input 
                                        type="file" 
                                        id="image" 
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        /> <br/>
                                <ThumbImage 
                                    src={feeds.feedimg}
                                    alt={feeds.feedtitle} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={cellStyle}></TableCell>
                                <TableCell sx={cellStyle} align="right">
                                    <Button active="true" type="submit" variant="contained" sx={{
                                        m : 1,
                                        background: "#03C179",
                                        color: "#eee",
                                        borderColor: "gray",}}> 
                                피드 수정 </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </form>
            </RightInnerWrap>           
        </RightContainer>        
        {/** <MyPageRight /> */}
    </Container>
  )
}