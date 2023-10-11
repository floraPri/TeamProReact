import styled from "styled-components";
import MyLeftMenu from "./myLeftMenu";

const Container = styled.div`
  width: 1280px;
  height: 100%;
  justify-content: center;
  display: inline-flex;
`;

const Table = styled.div`
  width: 1280px;
  height: 400px;
  background: white;
  border: 1px #DFDFDF solid;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  text-align: center;
  color: black;
  font-size: 36px;
  font-family: Ingrid Darling;
  font-weight: 400;
  word-wrap: break-word;
`;

const AddButton = styled.button`
  width: 100px;
  height: 49px;
  cursor: pointer;
  text-align: center;
  }
`;


export default function AddCs (){
    return(
      <Container>
        <MyLeftMenu />
            <form action="/admin/addCs" method="post">
                <Table>
                    <Title>등록하기</Title>
                    <tr>
                      <td>제목</td>
                      <td><input type="text" /></td>
                    </tr>
                    <tr>
                      <td>내용</td>
                      <td><input type="text" /></td>
                    </tr>
                    <AddButton type="submit">
                    <div></div>
                    <div>add</div>
                    </AddButton>
                </Table>
            </form>
        </Container>
      
      
    )
}