
import styled from "styled-components";
import { useState,useEffect } from "react";
import LoginPages from "../user/login/login";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuthToken } from "@/component/user/axios_helper";


export default function Searchresult (){
  
  const [token, setToken] = useState(null);
  const router = useRouter();
  const search = router.query.search || "";//router.query가 빈 객체일때, 할당하려다가 터지는 오류 방지
  const [auctionData, setAuctionData] = useState([]);//검색시 일치하는 모든 값 가져옴
  const [auctionDataSlice, setAuctionDataSlice] = useState([]);//상위 5개만 출력
  const [fundingData, setFundingData] = useState([]);
  const [fundingDataSlice, setFundingDataSlice] = useState([]);
  const [feedData, setFeednData] = useState([]);
  const [feedDataSlice, setFeedDataSlice] = useState([]);

  //검색시 검색어 굵은 글씨로 강조하는 함수
  function highlightText(text, highlight) { //(출력하는 모든 문자열, 그 중에서 강조할 문자열)
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));//문자열 자르기
    //RegExp 정규표현식 //gi는 전역 및 대소문자 무시하는 플래그
    return <span>{parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ?
        <strong key={i}>{part}</strong> ://문자열 부분들을 반복하면서 highlight와 일치시 태그로 감쌈
        part
    )}</span>;
  }

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('auth_token');
    setToken(tokenFromLocalStorage);
    if(search) {

    //
    const userno = localStorage.getItem('userno');
    axios.post(`http://localhost:8081/search/searchhistory`,{
      userno:userno,
      searchcontent:search
    },{
        headers: {
          Authorization: `Bearer ${(getAuthToken())}`
        }
      })
      .then((response) => {     
        const auctionDataFromResponse = response.data.searchHits.map(hit => hit.content);   
        //searchHits가 이미 배열이므로 여기에서 content만 추출해서 사용  
        setAuctionData(auctionDataFromResponse);
        setAuctionDataSlice(auctionDataFromResponse.slice(0, 5));
      })
      .catch((error) => {
              
      });
    //경매 리스트 받아오기
    axios.get(`http://localhost:8081/search/auctionsearch?search=${search}`, {
          headers: {
            Authorization: `Bearer ${(getAuthToken())}`
          }
        })
        .then((response) => {     
          const auctionDataFromResponse = response.data.searchHits.map(hit => hit.content);   
          //searchHits가 이미 배열이므로 여기에서 content만 추출해서 사용  
          setAuctionData(auctionDataFromResponse);
          setAuctionDataSlice(auctionDataFromResponse.slice(0, 5));
        })
        .catch((error) => {
                
        });
    //펀딩 리스트 받아오기
    axios.get(`http://localhost:8081/search/fundingsearch?search=${search}`, {
        headers: {
          Authorization: `Bearer ${(getAuthToken())}`
        }
      })
      .then((response) => {          
          const fundingDataFromResponse = response.data.searchHits.map(hit => hit.content);   
          //searchHits가 이미 배열이므로 여기에서 content만 추출해서 사용  
          setFundingData(fundingDataFromResponse);
          setFundingDataSlice(fundingDataFromResponse.slice(0, 5));
      })
      .catch((error) => {
        
      });
      //피드 리스트 받아오기
      axios.get(`http://localhost:8081/search/feedsearch?search=${search}`, {
          headers: {
            Authorization: `Bearer ${(getAuthToken())}`
          }
        })
        .then((response) => {          
          const feedDataFromResponse = response.data.searchHits.map(hit => hit.content);   
          //searchHits가 이미 배열이므로 여기에서 content만 추출해서 사용  
          setFeednData(feedDataFromResponse);
          setFeedDataSlice(feedDataFromResponse.slice(0, 5));
        })
        .catch((error) => {
          
        });
      }
  }, [search])//search값이 바뀔때마다 userEffect 재실행

  return(
    <Container>
      <SearchMain>

        
        <SearchBox>
          <SearchTitle>{search} 검색 결과</SearchTitle>
          {auctionData && auctionData.length > 0 ? 
          <Searchcategory>
            <SearchContentTitle>경매검색결과</SearchContentTitle>
            <SearchContent>
              {auctionDataSlice.map(ad => (
                <ContentCard key={ad.auctionno}>
                <CardLeft>
                  <CardTitle>{highlightText(ad.auctiontitle, search)}</CardTitle>
                  <CardContent>{highlightText(ad.auctioncontent, search)}</CardContent>
                </CardLeft>
                <CardRight>
                  {ad.image}
                </CardRight>
              </ContentCard>
              ))}
            </SearchContent>
          </Searchcategory> 
          : null }
          {fundingData && fundingData.length > 0 ? 
            <Searchcategory>
            <SearchContentTitle>펀딩검색결과</SearchContentTitle>
            <SearchContent>
              {fundingDataSlice.map(ad => (
                <ContentCard key={ad.fundingcode}>
                <CardLeft>
                  <CardTitle>{highlightText(ad.title, search)}</CardTitle>
                  <CardContent>{highlightText(ad.content, search)}</CardContent>
                </CardLeft>
                <CardRight>
                  {ad.image}
                </CardRight>
              </ContentCard>
              ))}
            </SearchContent>
            </Searchcategory>
          : null }

          {feedData && feedData.length > 0 ?
            <Searchcategory>
              <SearchContentTitle>피드검색결과</SearchContentTitle>
              <SearchContent>
                {feedDataSlice.map(ad => (
                  <ContentCard key={ad.feedcode}>
                  <CardLeft>
                    <CardTitle>{highlightText(ad.feedtitle, search)}</CardTitle>
                    <CardContent>{highlightText(ad.feedcontent, search)}</CardContent>
                  </CardLeft>
                  <CardRight>
                    {ad.feedimg}
                  </CardRight>
                </ContentCard>
                ))}
              </SearchContent>
            </Searchcategory>
          : null }

          {(auctionData && auctionData.length > 0) ||
            (fundingData && fundingData.length > 0) ||
            (feedData && feedData.length > 0) ? 
              null
          : <div>값이 존재하지 않습니다.</div> }

        </SearchBox>

      </SearchMain>
      <SideTab>
        {token === null || token === 'null' ? <LoginTab>
        <LoginPages />
        </LoginTab> : null } 
          <WeatherTab>
            {/* <Weather />  */}
          </WeatherTab>  
      </SideTab>
    </Container>
  )
}

const Container = styled.div`
margin:  100px auto 0 auto;
display: flex;
width: 940px;
height: auto;
justify-content: space-between;
`;


const SearchTitle = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  
`;

const SearchMain = styled.div`
  width: 600px;
  height: auto;
  /* border: 1px solid black; */
`;

const SearchBox = styled.div`

`;

const Searchcategory =styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 20px;
  padding: 20px;
`;

const SearchContentTitle = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 10px;
  /* border-bottom: 1px solid #f0f0f0; */
  padding-bottom: 15px;
`;

const SearchContent = styled.div`
   /* height: 300px; */
  /* border: 1px solid black;  */
  /* height: 640px; */
`;

const ContentCard = styled.div`
  border-bottom: 1px solid #f0f0f0; 
  display: flex;
  justify-content: space-between;
  width:560px;
  padding: 10px;
`;

const CardRight = styled.div`
  width:100px;
  height:100px;
`;

const CardLeft = styled.div`
   width:440px; 

`;



const CardTitle = styled.div`
  /* border: 1px solid black; */
  font-size: 20px;
  /* cursor:pointer; */
`;

const CardContent = styled.div`
  /* border: 1px solid black; */
  height:80px;
  /* cursor:pointer; */
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
  /* border: 1px solid black; */
  margin-bottom: 40px;
`;