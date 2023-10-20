import React, { useState, useEffect} from "react";
import axios from "axios";
import styled from 'styled-components';
import MyLeftMenu from '../../component/admin/myLeftMenu';
import { Chart } from 'react-google-charts';
import { getAuthToken } from "@/component/user/axios_helper";


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
    const [selectedMonth, setSelectedMonth] = useState('all'); // 선택한 월
  
    useEffect(() => {
        console.log("useEffect 시작")
        axios.get(`http://localhost:8081/admin/joinChart`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
                
              }
        })
            .then(response => {
            console.log("api응답:", response.data)
            if (Array.isArray(response.data)) {
                setJoinList(response.data);
            }
            })
            .catch(error => {
            console.log(error);
            })
        axios.get(`http://localhost:8081/admin/loginChart`,{
            headers: {
                Authorization: `Bearer ${(getAuthToken())}`
                
              }
        })
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

    const formattedJoinList = joinList.map(join => ({
        date: new Date(join.join_date),
        joinCount: join.join_count,
    }));

    const formattedLoginList = loginList.map(login => ({
        date: new Date(login.login_date),
        loginCount: login.login_count,
    }));

    // 월 선택 드롭다운에서 월을 변경할 때 호출
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    // 월 선택에 따라 데이터 필터링
    const filteredJoinList = formattedJoinList.filter(entry => {
        const selectedMonthDate = new Date(selectedMonth);
        return entry.date.getMonth() === selectedMonthDate.getMonth() && entry.date.getFullYear() === selectedMonthDate.getFullYear();
    });

    const filteredLoginList = formattedLoginList.filter(entry => {

        const selectedMonthDate = new Date(selectedMonth);
        return entry.date.getMonth() === selectedMonthDate.getMonth() && entry.date.getFullYear() === selectedMonthDate.getFullYear();

    });

    const chartDataJoin = [['날짜', 'join']].concat(filteredJoinList.map(entry => [entry.date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }), entry.joinCount]));

    const chartDataLogin = [['날짜', 'login']].concat(filteredLoginList.map(entry => [entry.date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }), entry.loginCount]));


  return (
    <Container>
        <MyLeftMenu />
        <ChartContainer>
            <div>
                <label>월 선택: </label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="2023-01">2023-01</option>
                    <option value="2023-02">2023-02</option>
                    <option value="2023-03">2023-03</option>
                    <option value="2023-04">2023-04</option>
                    <option value="2023-05">2023-05</option>
                    <option value="2023-06">2023-06</option>
                    <option value="2023-07">2023-07</option>
                    <option value="2023-08">2023-08</option>
                    <option value="2023-09">2023-09</option>
                    <option value="2023-10">2023-10</option>
                    <option value="2023-11">2023-11</option>
                    <option value="2023-12">2023-12</option>
            </select>
            </div>
            {filteredJoinList.length === 0 && filteredLoginList.length === 0 ? (
                <p>데이터가 존재하지 않습니다.</p>
            ) : (
            <>
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
            </>
            )}
        </ChartContainer>
    </Container>
  )
}
