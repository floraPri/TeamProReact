import React, { useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import MyLeftMenu from '../../component/admin/myLeftMenu';
import { Chart } from 'react-google-charts';


const Container = styled.div`
    width: 1280px;
    height: 100%;
    display: flex;
    margin: 0 auto;
`;

const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

export default function AdminHome() {

    const [joinList, setJoinList] = useState([]);
    const [loginList, setLoginList] = useState([]);
    
  
    useEffect(() => {
        console.log("useEffect 시작")
        axios.get(`http://localhost:8081/admin/joinChart`)
            .then(response => {
            console.log("api응답:", response.data)
            if (Array.isArray(response.data)) {
                setJoinList(response.data);
            }
            })
            .catch(error => {
            console.log(error);
            })
        axios.get(`http://localhost:8081/admin/loginChart`)
        .then(response => {
            console.log("api응답:", response.data)
            if (Array.isArray(response.data)) {
                setLoginList(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const formattedJoinList = joinList.map(join => [
        new Date(join.join_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        join.join_count,
    ]);

    const chartDataJoin = [['날짜', 'join']].concat(formattedJoinList);

    const formattedLoginList = loginList.map(login => [
        new Date(login.login_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        login.login_count,
    ]);

    const chartDataLogin = [['날짜', 'login']].concat(formattedLoginList);

  return (
    <Container>
      <MyLeftMenu />
      <ChartContainer>
        <Chart
            width={'1400px'}
            height={'400px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={chartDataJoin}
            options={{
                title: '회원가입 수',
                hAxis: {
                format: 'M/d',
                },
                vAxis: {
                    
                },
                chartArea: {
                    top: 50, // 상단 여백을 조절하려면 이 값을 조정
                    bottom: 50, // 아래 여백 설정
                },
            }}
            legendToggle
        />
        <Chart
            width={'1400px'}
            height={'400px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={chartDataLogin}
            options={{
                title: '로그인 수',
                hAxis: {
                    format: 'M/d',
                },
                vAxis: {
                },
                chartArea: {
                    top: 50, // 상단 여백을 조절하려면 이 값을 조정
                    bottom: 50, // 아래 여백 설정
                },
            }}
            legendToggle
        />
        </ChartContainer>
    </Container>
  )
}
