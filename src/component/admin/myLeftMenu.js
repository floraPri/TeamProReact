import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  margin-left: -100px;
  display: flex;
  justify-content: center;
`;
const ContainerIn = styled.div`
  width: 100%; 
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftMenu = styled.div`
  display: block;
  background-color: #D9D9D9;
  width: 200px;
  min-height:1200px;
  height: 100%
    
`;

const LeftMenuIn = styled.div`
  margin-top: 100px;
  margin-left: 50px;

    
`;

const LeftMenuTab = styled.div`
  margin-bottom: 20px;
  color: black;
  font-size: 20px;
  font-family: Inter;
  font-weight: 600;
  word-wrap: break-word;
  cursor: pointer;
  &:hover {
      color: #1877F2;
  }
`;

export default function MyLeftMenu (){
  const router = useRouter();
    return(
      <Container>
        <ContainerIn>
          <LeftMenu>
            <LeftMenuIn>
              <LeftMenuTab onClick={() => router.push('/admin/adminHome') }>HOME</LeftMenuTab>
              <LeftMenuTab onClick={() => router.push('/admin/adminSearchUser') }>유저검색</LeftMenuTab>
              <LeftMenuTab onClick={() => router.push('/admin/addCs') }>질문등록</LeftMenuTab>
              <LeftMenuTab>logout</LeftMenuTab>
            </LeftMenuIn>
          </LeftMenu>
        </ContainerIn>
      </Container>
    );
}