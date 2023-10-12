// 메세지 목록(main) 검색!
import styled from "styled-components";
import MessageRoom from "./messageRoom";

const Container = styled.div`
  display: flex;
  min-width:1280px;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid black;
`;

export default function MessageList (){
    return(
      <Container>
        <List>
            <p> 목록 </p>
        </List>
        <Room>
        <p>수신자</p>
            <MessageRoom/>
        </Room>
      </Container>
    )
}


const List = styled.div`
    margin-right:10px;
    background: #74e8bc;
    width: 400px;
    height: 650px;
    padding: 20px 10px 20px 10px;
    `;
const Room = styled.div`
    margin-left:10px;
    background: #74e8bc;
    width: 500px;
    height: 650px;
    padding: 20px 10px 20px 10px;
`;
