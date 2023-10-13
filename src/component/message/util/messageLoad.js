// 불러오기
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function MessageLoad (){
    return(
      <Container>
        <div><p>12</p></div><br/><br/>
        <div>34</div>
      </Container>
    )
}