import styled from "styled-components";
import MyLeftMenu from "./myLeftMenu";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Cap = styled.img`
  width: 1600px;
`;

export default function AdminSearchUser (){
    return(
      <MyLeftMenu />
    )
}