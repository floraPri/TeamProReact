import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 1600px;
`;

export default function AdminHome (){
    return(
      <Container>
        <Cap src="/assets/images/admin/adminMain.PNG" />
      </Container>
    )
}