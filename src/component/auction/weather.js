import Card from 'react-bootstrap/Card';
import styled, { css } from "styled-components";

const Header = styled.span`
    font-weight: bold;
    font-size: 18px;
`;

const TodayTemper = styled.span`
    font-weight: bold;
    ${({ color }) => css`
        color: ${color};
    `}
`;

const Text = styled.span`
    font-weight: bold;
    font-size: 18px;
`;

const Text_1 = styled.span`

`;

function weather() {

    const Temper = 5;

    let temperatureColor;
    let text;
    let Text_1;

    if (Temper <= 6) {
        temperatureColor = 'blue';
        text ="날씨가 추워요!";
        Text_1 = "겨울옷";
    } else if (Temper <= 15) {
        temperatureColor = 'skyblue';
        text ="날씨가 쌀쌀해요!";
        Text_1 = "두꺼운 바람막이";
    } else if (Temper <= 20) {
        temperatureColor = 'green';
        text ="날씨가 선선해요!";
        Text_1 = "바람막이"
    } else if (Temper <= 23) {
        temperatureColor = 'yellow';
        text ="날씨가 덥게 느껴질 수 도 있어요!";
        Text_1 = "긴옷";
    } else if (Temper <= 26) {
        temperatureColor = 'orange';
        text ="날씨가 더워요!";
        Text_1 = "반팔";
    } else {
        temperatureColor = 'red';
        text ="날씨가 매우 더워요!";
        Text_1 = "알몸";
    }

  return (
    <>
      <Card border="primary" style={{ width: '18rem' , height: '280px'}}>
        <Card.Header>
            <Header>
                오늘의 추천 옷차림
            </Header>
        </Card.Header>
        <Card.Body>
            <Card.Title>
                현재 기온&nbsp;
                <TodayTemper color={temperatureColor} > 
                    {Temper}&nbsp;
                </TodayTemper>
                °C
            </Card.Title>
          <Card.Text>
            <hr></hr>
            <Text>
                {text}<br></br>
            </Text>
            <br></br>
            오늘의 추천 옷차림은&nbsp;
            <Text_1>
                {Text_1}&nbsp;
            </Text_1>
            입니다!
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}

export default weather;