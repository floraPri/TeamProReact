import styled from "styled-components"
import LoginPages from "@/pages/user/login/login";
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
const WeatherTab = styled.div`
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



export default function Main (){

  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('auth_token');
    console.log(tokenFromLocalStorage);
    setToken(tokenFromLocalStorage);
  }, [])

    return(
      <Container>
        <Feed>
        </Feed>
        <SideTab>
         {token === null || token === 'null' ? <LoginTab>
          <LoginPages />
          </LoginTab> : null } 
          {/* <WeatherTab>
             <Weather /> 
           </WeatherTab>  */}
        </SideTab>
      </Container>
    )
}      