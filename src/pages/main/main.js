import styled from "styled-components"
import LoginPages from "@/pages/user/login/login";
import { useEffect ,useState } from "react";
import Weather from "@/component/auction/weather";
import News from "@/pages/news/news";
import FeedPage from "../feed/feedPage";

const Container = styled.div`
margin:  10px auto 0 auto;
display: flex;
width: 940px;
height: auto;
justify-content: space-between;
`;

const Feed = styled.div`
  width: 600px;
  height: 2000px;
  /* border: 1px solid black; */
`;

const LoginTab = styled.div`
  width: 300px;
  height: 300px;
  /* border: 1px solid black; */
  margin-bottom: 40px;
`;

const SideTab = styled.div`
`;

const SideTab2 = styled.div`
position: fixed;
margin-left: -300px;
`;

const WeatherTab = styled.div`
  width: 300px;
  height: 230px;
  border: 1px solid #d9d9d9;
  padding: 15px;
  margin-bottom: 40px;
  border-radius: 5px;
  /* position: sticky; */
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
          <FeedPage />
        </Feed>
        <SideTab>
          <SideTab2>
         {token === null || token === 'null' ? <LoginTab>
          <LoginPages />
          </LoginTab> : null } 
           <WeatherTab>
<Weather /> 
           </WeatherTab>
           <News/>  
           </SideTab2>
        </SideTab>
      </Container>
    )
}      