// 메세지 세부
import styled from "styled-components";
import { BsSend } from "react-icons/bs";

const Container = styled.div`
  padding: 20px 5px 20px 5px;
  background: rgba(209,240,228,0.7);
  margin: 5px 5px 5px 5px;
  white-space: pre-line;
  height: 580px;
  width: 480px;
  `;
const Container2 = styled.div`
  grid-template-rows: repeat(2, 1fr);

`;
const space = "\n";

export default function MessageRoom (){
    return(
      <Container>
        <Container2>
        <Left>
            <ReiceiveMsg>
                <p>받음</p>
            </ReiceiveMsg>
        </Left>

        <Right>
                <SendMsg>
                    <p>보냄</p>
                </SendMsg>
        </Right>
        </Container2>
        <Center>
            <SendBar>
                <SendInput>
                </SendInput>
                <SendIcon><BsSend style={{width:'20px',height:'20px'}}/> </SendIcon>
            </SendBar>
        </Center>

      </Container>
   )
}
const Left = styled.div`
    display: flex;
    justify-content: left;
    align-items: left;
`;
const Right = styled.div`
    display: flex;
    justify-content: right;
    align-items: right;
`;
const Center = styled.div`
    display: flex;
    justify-content: Center;
    align-items: Center;
    grid-template-columns: repeat(2, 1fr);
`;

const ReiceiveMsg = styled.div`
    align: "left";
    background: white;
    align-items: left;
    text-align: left;
    margin: 5px 10px 5px 10px;
    width: 300px;
    padding: 5px 10px 5px 10px;
    `;
    
const SendMsg = styled.div`
    align: "right";
    background: skyblue;
    align-items: right;
    text-align: right;
    margin: 5px 10px 5px 10px;
    width: 300px;
    padding: 5px 10px 5px 10px;
    `;
const SendBar = styled.div`
    width: 440px;
    height: 42px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    
`;

const SendInput = styled.input`
    margin: 2px 2px 2px 2px;
    width: 90%;
    height: 80%;
`;

const SendIcon = styled.div`
    padding: 5px 5px 2px 5px;
    cursor: pointer;
    &:hover {
        color: #1877F2;
    }
`;
