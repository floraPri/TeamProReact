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
`;

export default function MessageList (){
    return(
      <Container>
        <List>
            <p> messageList.js </p>
            <RoomList>
            <ProfileImg> img </ProfileImg> 수신자 정보
            <p> content </p>
            <p> 23.10.12 </p>
            </RoomList>
        </List>
        <Room>
        <p>messageRoom.js</p>
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

const RoomList = styled.div`
  margin: 10px 10px 10px 10px;
  width: 370px;
  height : 100px;
  background: rgb(255, 255, 255, 0.6)
`;
const ProfileImg = styled.div`
  margin: 0px 5px 5px 5px;
  margin-top: 5px;
  width: 30px;
  height: 30px;
  background: #FFFFFF;
`;

