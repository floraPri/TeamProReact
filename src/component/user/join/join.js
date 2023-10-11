import React from "react";
import styled from "styled-components";

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
export default class LoginForm extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        active: "login",
        email: "",    // login: "" -> id: ""
        password: "",
        phone: "",
        name: "",
        onLogin: props.onLogin, // 사용자가 자격증명을 보낸후 상위구성요소가 로그인 양식을 숨길수 있다.
        onRegister: props.onRegister
    };
};

// 필드의 업데이트된 값을 state에 저장
onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
};

// 로그인 처리
onSubmitLogin = (e) => {
    this.state.onLogin(e, this.state.email, this.state.password);  // this.state.login-> this.state.id
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
      <div className="row justify-content-center">
        <div className="col-4">
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          
          {/* Login 버튼 */}
          <li className="nav-item" role="presentation">
            <button                   
               id="tab-login" onClick={() => this.setState({active: "login"})}>Login</button>
          </li>

          {/* Register 버튼 */}
          <li className="nav-item" role="presentation">
            <button  
             id="tab-register" onClick={() => this.setState({active: "register"})}>Register</button>
          </li>
        </ul>

        <div className="tab-content">
          <div  
            id="pills-login" >
            
            {/* 로그인 폼, (name="login" -> name="id"),  input type="login" -> input type="text", label : ID */}
            <form onSubmit={this.onSubmitLogin}>

              <div className="form-outline mb-4">
                <input type="text" id="loginName" name= "email" className="form-control" onChange={this.onChangeHandler}/>   
                <label className="form-label" htmlFor="loginName">email</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                <label className="form-label" htmlFor="loginPassword">Password</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

            </form>
          </div>
          
          {/* 등록 폼, (name="login" -> name="id")  , label : ID*/}
          <div id="pills-register" >
            <form onSubmit={this.onSubmitRegister}>
             
              <div className="form-outline mb-4">
                <input type="text" id="login" name="email" className="form-control" onChange={this.onChangeHandler}/>
                <label className="form-label" htmlFor="login">email</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                <label className="form-label" htmlFor="registerPassword">Password</label>
              </div>

              <div className="form-outline mb-4">
                <input type="text" id="phone" name="phone" className="form-control" onChange={this.onChangeHandler}/>
                <label className="form-label" htmlFor="phone">phone</label>
              </div>

              <div className="form-outline mb-4">
                <input type="text" id="name" name="name" className="form-control" onChange={this.onChangeHandler}/>
                <label className="form-label" htmlFor="name">name</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}
}

/* 
export default function Join (){
    return(
      <Container>
          <form action="/login/login" method="post">
              <Card>
                  <Title>weAround</Title>
                  <EmailInput>
                  <input type="text" placeholder="email" required/>
                  </EmailInput>
                  <PasswordInput>
                  <input type="text" placeholder="password" required/>
                  </PasswordInput>
                  <PhoneInput>
                  <input type="text" placeholder="phone" required/>
                  </PhoneInput>
                  <NameInput>
                  <input type="text" placeholder="name" required/>
                  </NameInput>
                  <LoginButton type="submit">
                  <div></div>
                  <div>join</div>
                  </LoginButton>
              </Card>
          </form>
      </Container>
    )
} */