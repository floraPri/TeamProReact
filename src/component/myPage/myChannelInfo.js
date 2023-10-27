import { useEffect ,useState } from "react";
import styled from "styled-components";
import rightStyles from "@/component/myPage/myPRightStyle.module.css";

export default function MyChannelInfo(){
    const [email,setEmail] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem('email');

        if(userEmail){
            setEmail(userEmail);
        }
    }, []);

    return(
        <div className={rightStyles.topWrap}>
            <h3>{email}님 채널입니다! 환영합니다.</h3>
            <div className={rightStyles.boxWarp}>
                <div className={rightStyles.innerBox}>
                    <p>
                        내가 작성한 피드<br/>
                        <span className={rightStyles.spanTxt}>000</span>
                    </p>
                </div>
                <div className={rightStyles.innerBox}>
                    <p>
                        팔로워<br/>
                        <span className={rightStyles.spanTxt}>000</span>
                    </p>
                </div>
                <div className={rightStyles.innerBox}>
                    <p>
                        팔로잉<br/>
                        <span className={rightStyles.spanTxt}>000</span>
                    </p>
                </div>
            </div>
        </div>
    );
}