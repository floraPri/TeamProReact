import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { getAuthToken } from "../user/axios_helper";
import axios from "axios";


export default function SearchRank () {

    useEffect(() => {
        axios.get(`http://localhost:8081/search/searchrank`,{
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
      }, [])//search값이 바뀔때마다 userEffect 재실행

    return (
        <WhiteBox>
            <SearchRankTitle>인기 검색어</SearchRankTitle>
            <RankContent>
                <CardRank>
                    <RankNum>1</RankNum>
                    <RankString>자퇴서</RankString>
                </CardRank>
            </RankContent>
        </WhiteBox>
    )
}

const WhiteBox = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 3px;
  border: 1px #DFDFDF solid;
`;

const SearchRankTitle = styled.div`

`;

const RankContent = styled.div`

`;

const CardRank = styled.div`

`;

const RankNum = styled.div`

`;

const RankString = styled.div`

`;
