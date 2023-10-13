import styled from "styled-components"
import LoginPages from "@/pages/user/login/login";
import { request } from "../user/axios_helper";
import { useEffect ,useState } from "react";

const Container = styled.div`
margin:  100px auto 0 auto;
display: flex;
width: 940px;
height: auto;
justify-content: space-between;
`;
const Feed = styled.div`
  width: 600px;
  height: 2000px;
  border: 1px solid black;
`;
const LoginTab = styled.div`
  width: 300px;
  height: 300px;
  /* border: 1px solid black; */
  margin-bottom: 40px;
`;

const SideTab = styled.div`

`;
const Weather = styled.div`
  width: 300px;
  height: 180px;
  border: 1px solid black;
  margin-bottom: 40px;
`;
const Recommend = styled.div`
  width: 300px;
  height: 180px;
  border: 1px solid black;
`;
const Logout = styled.button`
  color: red;
`;



export default function Main (){

  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('auth_token');
    setToken(tokenFromLocalStorage);
  }, [])

  const handleLogout = () => {
    request(
      "POST",
      "/logout/",
      {
        Authorization: `Bearer ${token}`
      }
    ).then((response) => {
        if (response.status === 200) {
          // 로그아웃 성공
          localStorage.removeItem('auth_token');
          // 다른 로직을 수행하거나 리디렉션할 수 있습니다
          window.location.href = '/'; // 예: 홈페이지로 리디렉션
        } else {
          // 로그아웃 실패
          console.error('로그아웃 실패');
        }
      })
      .catch((error) => {
        console.error('로그아웃 요청 중 오류 발생', error);
      });
  };

    return(
      <Container>
        <Feed>
        </Feed>
        <SideTab>
         {token === null || token === 'null' ? <LoginTab>
          <LoginPages />
          </LoginTab> : null } 
          <Weather />
          <Recommend />
          <Logout onClick={handleLogout}>로그아웃</Logout>
        </SideTab>
      </Container>
    )
}      