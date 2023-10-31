import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";


const LoginForm = (props) => {

  const [state, setState] = useState({
    active: "login",
    email: "",
    password: "",
    phone: "",
    name: "",
  });


// 필드의 업데이트된 값을 state에 저장
const onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
};

// 로그인 처리
const onSubmitLogin = (e) => {
    e.preventDefault();
    props.onLogin(state.email, state.password);
};


const router = useRouter();
    
    return (
      <form onSubmit={onSubmitLogin}>
        <WhiteBox>
          <Title>weAround</Title>
          <InputField type="text" name= "email" placeholder="email" onChange={onChangeHandler} required />
          <InputField type="password" name="password" placeholder="password" onChange={onChangeHandler} required />
          <GreenButton type="submit">Login</GreenButton>
          <ORLine>
            <BorderLine />
            <ORText>OR</ORText>
            <BorderLine />
          </ORLine>
          <CreateAccountLink onClick={() => router.push('/user/join/join') }>Create join account</CreateAccountLink>
        </WhiteBox>
      </form>
    )
}

export default LoginForm;

const WhiteBox = styled.div`
  width: 300px;
  height: 300px;
  left: 0px;
  top: 0px;
  background: white;
  border-radius: 3px;
  border: 1px #DFDFDF solid;
`;

const Title = styled.div`
  width: 100px;
  height: 50.22px;
  margin-top: 25.11px;
  margin: 25px auto 0 auto;
  text-align: center;
  color: black;
  font-size: 20px;
  font-family: 'Ingrid Darling', sans-serif;
  word-wrap: break-word;
`;

const InputField = styled.input`
  width: 230px;
  height: 31px;
  margin: 5px 32px 0px 32px;
  padding: 0px 15px;
  border-radius: 2px;
  border: 1px #DFDFDF solid;
  background: #FAFAFA;
  font-size: 14px;
`;

const GreenButton = styled.button`
  width: 229.71px;
  height: 26.79px;
  margin: 10px 35px 0px 35px;
  background: #03C179;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`;
const ORLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 25px;


`;
const ORText = styled.div`
  width: 15.43px;
  height: 13.39px;
  text-align: center;
  color: #797979;
  margin: 0px 20px;
  font-size: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  word-wrap: break-word;
`;

const BorderLine = styled.div`
  width: 96.86px;
  height: 0px;
  border: 1px #D4D4D4 solid;
`;

const CreateAccountLink = styled.a`
  width: 113.14px;
  height: 14.23px;
  margin: 0px 100px;
  text-align: center;
  color: #1997F6;
  font-size: 11px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-decoration: underline;
  word-wrap: break-word;
  cursor: pointer;
`;