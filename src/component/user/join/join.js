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
}