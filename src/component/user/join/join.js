import React from "react";
import styled from "styled-components";


export default class JoinForm extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        active: "join",
        email: "",    // login: "" -> id: ""
        password: "",
        phone: "",
        name: "",
        onRegister: props.onRegister// 사용자가 자격증명을 보낸후 상위구성요소가 로그인 양식을 숨길수 있다.
    };
};

// 필드의 업데이트된 값을 state에 저장
onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
};

// 등록 처리
onSubmitRegister = (e) => {
    console.log('onSubmitRegister~~~~~~~~~~~');
    this.state.onRegister(
        e,            
        this.state.email,    // this.state.login-> this.state.id 
        this.state.password,
        this.state.phone,
        this.state.name
    );
};

render() {
    return (
      <Container>
          <form onSubmit={this.onSubmitRegister}>
              <Card>
                  <Title>weAround</Title>
                  <EmailInput>
                    <input type="text" name="email" placeholder="email" onChange={this.onChangeHandler} required/>
                  </EmailInput>
                  <PasswordInput>
                    <input type="text" name="password" placeholder="password" onChange={this.onChangeHandler} required/>
                  </PasswordInput>
                  <PhoneInput>
                    <input type="text" name="phone" placeholder="phone" onChange={this.onChangeHandler} required/>
                  </PhoneInput>
                  <NameInput>
                    <input type="text" name="name" placeholder="name" onChange={this.onChangeHandler} required/>
                  </NameInput>
                  <LoginButton type="submit">
                  <div></div>
                  <div>join</div>
                  </LoginButton>
              </Card>
          </form>
      </Container>
    )
  }
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 174px;
  padding-bottom: 174px;
  background: white;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;

const Card = styled.div`
  width: 537px;
  height: 720px;
  position: relative;
  background: white;
  border: 1px #DFDFDF solid;
  margin: 0 auto
`;

const Title = styled.div`
  width: 170px;
  left: 190px;
  top: 114px;
  position: absolute;
  text-align: center;
  color: black;
  font-size: 36px;
  font-family: Ingrid Darling;
  font-weight: 400;
  word-wrap: break-word;
`;

const LoginButton = styled.button`
  width: 411.19px;
  height: 49px;
  left: 64.44px;
  top: 582px;
  position: absolute;
  border: none;
  background: none;
  cursor: pointer;

  & > div:first-child {
    width: 411.19px;
    height: 49px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: #1877F2;
    border-radius: 8px;
  }

  & > div:last-child {
    width: 58.30px;
    left: 174.91px;
    top: 9px;
    position: absolute;
    text-align: center;
    color: white;
    font-size: 20px;
    font-family: Inter;
    font-weight: 600;
    word-wrap: break-word;
  }
`;

const EmailInput = styled.div`
  width: 411.19px;
  height: 38px;
  left: 64.44px;
  top: 223px;
  position: absolute;

  & > input:first-child {
    width: 411.19px;
    height: 38px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: #FAFAFA;
    border-radius: 2px;
    border: 1px #DFDFDF solid;
    padding-left: 15px;
    color: black;
  }
`;

const PasswordInput = styled.div`
  width: 411.19px;
  height: 38px;
  left: 64.44px;
  top: 283px;
  position: absolute;

  & > input:first-child {
    width: 411.19px;
    height: 38px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: #FAFAFA;
    border-radius: 2px;
    border: 1px #DFDFDF solid;
    padding-left: 15px;
    color: black;
  }
`;

const PhoneInput = styled.div`
  width: 411.19px;
  height: 38px;
  left: 64.44px;
  top: 343px;
  position: absolute;

  & > input:first-child {
    width: 411.19px;
    height: 38px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: #FAFAFA;
    border-radius: 2px;
    border: 1px #DFDFDF solid;
    padding-left: 15px;
    color: black;
  }
`;

const NameInput = styled.div`
  width: 411.19px;
  height: 38px;
  left: 64.44px;
  top: 403px;
  position: absolute;

  & > input:first-child {
    width: 411.19px;
    height: 38px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: #FAFAFA;
    border-radius: 2px;
    border: 1px #DFDFDF solid;
    padding-left: 15px;
    color: black;
  }
`;