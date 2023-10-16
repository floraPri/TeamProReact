import React from 'react';
import styled from 'styled-components';
import MyLeftMenu from '../../component/admin/myLeftMenu';
import { Chart } from 'react-google-charts';

const Container = styled.div`
    width: 1280px;
    height: 100%;
    display: flex;
    margin: 0 auto;
`;

const AdminHome = () => {
  return (
    <Container>
      <MyLeftMenu />
        <Chart
            width={'800px'}
            height={'600px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['날짜', '회원가입 수'],
                ['10/12', 125],
                ['10/13', 57],
                ['10/14', 457],
                ['10/15', 234],
                ['10/16', 123],
            ]}
            options={{
                title: '회원가입 수',
                hAxis: {
                title: '날짜',
                format: 'M/d',
                },
                vAxis: {
                    title: '회원가입 수',
                },
            }}
            legendToggle
        />
        <Chart
            width={'800px'}
            height={'600px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['날짜', '로그인 수'],
                ['10/12', 200],
                ['10/13', 234],
                ['10/14', 547],
                ['10/15', 134],
                ['10/16', 754],
            ]}
            options={{
                title: '로그인 수',
                hAxis: {
                    title: '날짜',
                    format: 'M/d',
                },
                vAxis: {
                    title: '로그인 수',
                },
            }}
            legendToggle
        />
    </Container>
  );
};

export default AdminHome;