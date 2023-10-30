//import Card from 'react-bootstrap/Card';
import styled, { css } from "styled-components";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherTab = styled.div`
  width: 300px;
  height: 245px;
  border: 1px solid #d9d9d9;
  padding: 15px;
  margin-bottom: 40px;
  border-radius: 5px;
`;

const WeatherTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid #e8e8e8;
`;

const WeatherTitleL = styled.div`
  font-size: 14px;
  color: gray;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

const WeatherTitleR = styled.div`
`;

//표현식 color 추출, color 값 있으면 color 색을  color로 지정
const WeartherTemp = styled.div`
  font-size: 40px;
  text-align: center;
  margin: 20px;
  font-weight: 600;
  ${({ color }) => `color: ${color};`}
`;

const WheatherRecommend = styled.div`
  text-align: center;
`;

const WeatherIcon = styled.img`
width: 25px;
`;

function Weather() {

    const [weather, setWeatherData] = useState({});

    const temperatureColor = (temper) => {
        console.log('색변경 테스트');
        if (temper >= 28) {
            return '#ff2414';
        } else if (temper <= 27 && temper >= 23) {
            return '#e64629';
        } else if (temper <= 22 && temper >= 20) {
            return '#ffbf29';
        } else if (temper <= 19 && temper >= 17) {
            return '#71fc58';
        } else if (temper <= 16 && temper >= 12) {
            console.log('색변경 테스트2');
            return '#52faa9';
        } else if (temper <= 11 & temper >= 9) {
            return '#52bfff';
        } else if (temper <= 8 & temper >= 5) {
            return '#408fff';
        } else {
            return '#4026ff';
        }
    };

    useEffect(() => {
        const apiUrl = 'http://localhost:8081/weather/today';

        axios.get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error('API 호출 중 오류 발생: ', error);
            });
    }, []);
    // {temperatureColor(weather.t1hValue)}
    return (
        <WeatherTab>
            <WeatherTitle>
                <WeatherTitleL>
                    <WeatherIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Emblem_of_the_Government_of_the_Republic_of_Korea.svg/1200px-Emblem_of_the_Government_of_the_Republic_of_Korea.svg.png" /><span style={{ fontSize: '20px', color: 'black' }}>기상청&nbsp;</span>제공
                </WeatherTitleL>
                <WeatherTitleR>

                </WeatherTitleR>
            </WeatherTitle>
            <WeartherTemp color={temperatureColor(weather.t1hValue)}>
                {weather.t1hValue}°C
            </WeartherTemp>
            <WheatherRecommend>
                오늘의 추천 옷차림은<br />
                <span style={{ fontSize: '20px', color: 'black', fontWeight: '900' }}>{weather.clothes}&nbsp;</span><br></br>
                입니다
            </WheatherRecommend>
        </WeatherTab>

    );
}

export default Weather;
