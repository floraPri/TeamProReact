import styled from "styled-components";
import React from 'react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 50px;
  margin-left: 50px;
`;

const ToDayAcuti = styled.div`
  font-size: 21px;
`;

const Back = styled.div`
  padding: 20px;
  background-color: #e0fdff;
  width: 1100px; /* 화면 가로 크기의 50%로 설정 */
  margin: 0 auto; /* 가운데 정렬을 위한 스타일 */
`;

const ToDayAcuBo = styled.div`
  display: flex; 
  padding-top: 30px;
  flex-direction: column;
`;

const AcuName = styled.div`
  display: flex; 
  padding-bottom:90x;
`;

const AcuName__1 = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const AcuName__2 = styled.div`
  padding-right: 12px;
  padding-left: 12px;
`;

const AcuName__3 = styled.div`
`;

const AcuImg = styled.div`
`;

const AcuInfo = styled.div`
  display: flex; 
  padding: 10px;
  padding-left: 12px;
`;

const AcuTa = styled.div`
  display: flex; 
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 23px;
`;

const TrC = styled.tr`
  display: flex; 
  background-color: white;
  font-size: 19px;
  width: 350px;
  height: 180px;
  padding: 9px;
`;

const AcuInfo2 = styled.div`
`;


const AcuInfo3 = styled.div`
padding-left: 180px;
padding-right: 170px;
`;

const AcuInfo4 = styled.div`
`;

const AcuInfoBo = styled.div`
  display: flex; 
`;

const Cheat = styled.div`
  background-color: white;
`;

const Seller = styled.div`
  width: 180px;
  display: flex;
  font-size: 27px;
  font-weight: bold;
`;

const LastP = styled.div`
  width: 200px;
  display: flex;
`;

const NowBy = styled.div`
  display: flex;
`;

const Buy = styled.div`
  padding-top: 20px;
  display: flex;
`;
export default function AuctionDetail (){
    return(
      <Container>
        <ToDayAcuti>
          <h3>오늘의 경매 PARTY</h3><br/>
        </ToDayAcuti>
        <Back>
          <ToDayAcuBo>
            <AcuName>
              <AcuName__1>
                자퇴서
              </AcuName__1>
              <AcuName__2>
                경매 남은 시간
              </AcuName__2>
              <AcuName__3>
                55 : 38 : 51 : 13
              </AcuName__3>
            </AcuName>
            <AcuInfo>
              <AcuImg><img src="/assets/images/auction/ac1.PNG"/></AcuImg>
              <AcuTa>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>현재 경매 참여자 :</span> 
                        <span>55</span>
                        <span>명</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>시작 금액 : </span>
                        <span>650000</span>
                        <span>원</span> 
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>즉시 구매가 : </span>
                        <span>1000000</span>
                        <span>원</span>
                      </td>
                    </tr>              
                    <tr>
                      <td>
                        <span>현재 최소 입찰가 : </span>
                        <span>50000</span>
                        <span>원</span>
                      </td>
                    </tr>
                    <TrC>
                      <td colSpan="3">
                        자퇴서 입니다 <br/>
                        유용하게 사용하세요
                      </td>
                    </TrC>
                  </tbody>
                </table>
              </AcuTa>
              <Cheat>
                <div>
                  <div>
                    <p>aaa</p>
                    <span> : </span>
                    <span>진심 이 가격까지 오른다고?</span>
                  </div>
                </div>
                <div>
                  <div>
                    <p>aab</p>
                    <span> : </span>
                    <span>자퇴서를 왜 사?</span>
                  </div>
                </div>
                <div>
                  <input type="text" className="msg" />
                  <button>전송</button>
                </div>
              </Cheat>
            </AcuInfo>
          </ToDayAcuBo>
          <AcuInfoBo>
            <AcuInfo2>
              <Seller>
                <p>판매자 : </p>
                <p>화석</p>
              </Seller>
            </AcuInfo2>
            <AcuInfo3>
              <LastP>
                <p>현재 최종가 : </p>
                <p>1150000</p>
                <p>원</p>
              </LastP>
              <NowBy>
                <p>입찰자 : </p>
                <p>yebiFossil19</p>
              </NowBy>
            </AcuInfo3>
            <AcuInfo4>
              <Buy>
                <input type="text" className="AcP" />
                <button>입찰하기</button>
              </Buy>
            </AcuInfo4>
          </AcuInfoBo>
          {/* <Cap src="/assets/images/auction/auctionDetail.PNG" /> */}
        </Back>
    </Container>
    )
}