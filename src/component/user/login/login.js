import Link from "next/link";
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
  height: 372px;
  position: relative;
  background: white;
  border-radius: 3px;
  border: 1px #DFDFDF solid;
  margin: 0 auto
`;

const Title = styled.div`
  width: 180px;
  left: 190px;
  top: 30px;
  position: absolute;
  text-align: center;
  color: black;
  font-size: 36px;
  font-family: Ingrid Darling;
  font-weight: 400;
  word-wrap: break-word;
`;

const OrSection = styled.div`
  width: 455.68px;
  height: 16px;
  left: 41.43px;
  top: 265px;
  position: absolute;

  & > div:first-child {
    width: 27.62px;
    left: 213.27px;
    top: 0px;
    position: absolute;
    text-align: center;
    color: #797979;
    font-size: 13px;
    font-family: Inter;
    font-weight: 600;
    word-wrap: break-word;
  }

  & > div:last-child {
    width: 173.37px;
    height: 0px;
    left: 282.31px;
    top: 8px;
    position: absolute;
    border: 1px #D4D4D4 solid;
  }

  & > div:nth-child(2) {
    width: 173.37px;
    height: 0px;
    left: 0px;
    top: 8px;
    position: absolute;
    border: 1px #D4D4D4 solid;
  }
`;

const CreateAccountLink = styled.div`
  width: 202.53px;
  left: 168.77px;
  top: 329px;
  position: absolute;
  text-align: center;
  color: #1997F6;
  font-size: 14px;
  font-family: Inter;
  font-weight: 400;
  text-decoration: underline;
  word-wrap: break-word;
`;

const EmailInput = styled.div`
  width: 411.19px;
  height: 38px;
  left: 64.44px;
  top: 110px;
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
  top: 154px;
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

const LoginButton = styled.button`
  width: 411.19px;
  height: 32px;
  left: 64.44px;
  top: 207px;
  position: absolute;
  border: none;
  background: none;
  cursor:pointer;

  & > div:first-child {
    width: 411.19px;
    height: 32px;
    left: 0px;
    top: 0px;
    position: absolute;
    background: #1877F2;
    border-radius: 8px;
  }

  & > div:last-child {
    width: 58.30px;
    left: 174.91px;
    top: 7px;
    position: absolute;
    text-align: center;
    color: white;
    font-size: 14px;
    font-family: Inter;
    font-weight: 600;
    word-wrap: break-word;
  }
`;

export default function Login (){
    return(
      <div>
        <Container>
            <form action="/first/first" method="post">
                <Card>
                    <Title>weAround</Title>
                    <EmailInput>
                    <input type="text" placeholder="email" required />
                    </EmailInput>
                    <PasswordInput>
                    <input type="text" placeholder="password" required />
                    </PasswordInput>
                    <LoginButton>
                    <div></div>
                    <div>Login</div>
                    </LoginButton>
                    <OrSection>
                    <div>OR</div>
                    <div></div>
                    <div></div>
                    </OrSection>
                    <CreateAccountLink><Link href="/user/join/join">create join account</Link></CreateAccountLink>
                </Card>
            </form>
        </Container>
        <Link href="/admin/adminHome">admin</Link>
        <Link href="/admin/adminUser">adminuser</Link>
      </div>
    )
}      