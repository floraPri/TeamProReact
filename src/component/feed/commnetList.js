import axios from "axios";
import styled from "styled-components";
import { useEffect , useState } from "react";
import feedStyles from "@/component/feed/feedStyles.module.css";

const CommentWrap = styled.div`
    width: 100%;
    margin-top: 50px;
`;

export default function CommentList({feedcode}){
    const [comments, setComments] = useState([]);

    const formatTimeStamp = (timestamp) => {
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          //hour: "2-digit",
          //minute: "2-digit",
        };
        const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(new Date(timestamp));
        return formattedDate;
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/feed/commentList?feedcode=${feedcode}`)
        .then((response) => {
            if(response.data){
                setComments(response.data);
            } else {
                setComments([]);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [feedcode]);

    return(
        <CommentWrap>
            {/* <h3>댓글목록</h3>
            {feedcode} */}
            <ul className={feedStyles.cmtUl}>
                {comments.map((comment) => ( 
                    <li key={comment.commentno}>
                        <div className={feedStyles.cmtList}>
                            <p className={feedStyles.writerWarp}>{comment.writer}</p>
                            <p className={feedStyles.cmtContentWrap}>{comment.comment_content}</p>
                            <p>{formatTimeStamp(comment.regdate)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </CommentWrap>
    );
} 