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
  white-space: pre-line;
`;

export default function MessageList (){
    return(
      <Container>
        <List>
            {/* <p> messageList.js </p> */}
            <RoomList>
            <ProfileImg> </ProfileImg> 
            <p> user </p>
            <p> content </p>
            <p> 23.10.12 </p>
            </RoomList>
        </List>
        <Room>
        {/* <p>messageRoom.js</p> */}
            <MessageRoom/>
        </Room>
      </Container>
    )
}


const List = styled.div`
  margin-right: 5px;
  border: 0.5px solid #74e8bc;
  border-radius: 10px;
  width: 400px;
  height: 650px;
  padding: 5px 5px 5px 5px;
  `;
const Room = styled.div`
  margin-left: 5px;
  border: 0.5px solid #74e8bc;
  border-radius: 10px;
  width: 500px;
  height: 650px;
  padding: 5px 5px 5px 5px;
  justify-content: center;
`;

const RoomList = styled.div`
  margin: 10px 10px 10px 10px;
  padding: 5px 5px 5px 5px;
  width: 370px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  grid-template-columns: repeat(2, 1fr);
  display: flex;
`;
const ProfileImg = styled.div`
  margin: 0px 5px 5px 5px;
  margin-top: 5px;
  width: 60px;
  height: 60px;
  background: rgba(0,0,0,0.4);
  border-radius:50px;
`;

