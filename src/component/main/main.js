import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 2000px;
  height: 1000px;
`;


export default function Main (){
    return(
      <Container>
        <Cap src="/assets/images/mainImg.PNG" />
      </Container>
    )
}      