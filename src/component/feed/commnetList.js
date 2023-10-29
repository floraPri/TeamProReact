import axios from "axios";
import { useEffect , useState } from "react";


export default function CommentList({feedcode}){
    const [comments, setComments] = useState([]);

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
        <div>
            {/* <h3>댓글목록</h3>
            {feedcode} */}
            {feedcode}
            <ul>
                {comments.map((comment) => ( 
                    <li key={comment.commentno}>
                        <div>
                            <p>{comment.writer}</p>
                            <p>{comment.comment_content}</p>
                            <p>{comment.regdate}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
} 