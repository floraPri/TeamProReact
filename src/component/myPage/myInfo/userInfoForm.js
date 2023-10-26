import styled from "styled-components";
import * as React from 'react';
import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";
import { red } from "@mui/material/colors";


{/** 오른쪽 영역 */}
{/** 회원정보 수정 폼 */}
export default function MyInfoEdit(){

    
    
    const [state, setState] = useState({
        userno:"",
        email: "",
        password: "",
        repassword: "",
        phone: "",
        name: "",
      });

      const onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    useEffect(() => {
        const userno = localStorage.getItem("userno");
        axios.get(`http://localhost:8081/user/userdetail?userno=${userno}`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
            }
        })
        .then((response) => {
            const { email, name, phone, userno } = response.data;
            setState(prevState => ({
                ...prevState,
                email: email,
                phone: phone,
                name: name,
                userno: userno,
            }));
            
       }) 
       .catch((error) => {
           
       })
    },[]);

    

    const onUpdate = (e) => {
        
        e.preventDefault();
        if(state.password === state.repassword){
            axios.post(`http://localhost:8081/user/userupdate`,{
            
            email:state.email,
            password:state.password,
            phone:state.phone,
            name:state.name,
            userno:state.userno

            },{
                headers: {
                    Authorization: `Bearer ${(getAuthToken())}`
                }
            })
            .then((response) => {
                alert("회원정보가 수정되었습니다.")
                window.location.href = '/myPage/myp';
            }) 
            .catch((error) => {
                
            }) 
        }
        else{
            alert("비밀번호를 다시 확인해주세요.");
            return;
        }
    }

    return(
    <RightContainer>
        <ContainerIn>
            <h3>회원정보 수정</h3>
            <Updateform onSubmit={onUpdate}>
                <Rowbox>
                    <Inputname><span style={{color:'red'}}>* </span>이메일</Inputname>
                    <Inputbox name="email" type="text" value={state.email}/>
                    <input name="userno" type="hidden" value={state.userno}/>
                </Rowbox>
                <Rowbox>
                <Inputname><span style={{color:'red'}}>* </span>비밀번호</Inputname>
                    <Inputbox
                        name="password"
                        type="password"
                        onChange={onChangeHandler}
                        required />
                </Rowbox>
                <Rowbox>
                <Inputname><span style={{color:'red'}}>* </span>비밀번호 확인</Inputname>
                    <Inputbox
                        name="repassword"
                        type="password"
                        onChange={onChangeHandler}
                        required />
                </Rowbox>
                <Rowbox>
                <Inputname><span style={{color:'red'}}>* </span>이름</Inputname>
                    <Inputbox
                        name="name"
                        type="text"
                        value={state.name}
                        onChange={onChangeHandler}
                        required
                        />
                </Rowbox>
                <Rowbox>
                <Inputname><span style={{color:'red'}}>* </span>연락처</Inputname>
                    <Inputbox 
                        name="phone"
                        type="text"
                        value={state.phone}
                        onChange={onChangeHandler}
                        required
                        />
                </Rowbox>
                <Button type="submit" variant="contained" size="medium">수정</Button>
            </Updateform>
        </ContainerIn>
    </RightContainer>
    );
}

const RightContainer = styled.div`
    width: 960px; 
    padding-left: 50px;
`;
const ContainerIn = styled.div`
    width: 300px; 
    margin: 0 auto;
    padding-top: 50px;
`;

const Inputbox = styled.input`
    border: none;
    width: 280px;
    border-bottom: 1px solid black;
    background-image: linear-gradient(to top, #fcfcfc, white);
    &:focus {
        outline: none;
    }
`;

const Rowbox = styled.div`
    margin-bottom: 20px;
`;

const Inputname = styled.div`
    padding-top: 10px;
`;

const Updateform = styled.form`
    padding-top: 10px;
`;