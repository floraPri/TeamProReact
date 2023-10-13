import MyPagesMenu from "../myPagesMenu";
import styled from "styled-components";
import MySalesList from "./mySalesList";

const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

export default function MySales(){
    return(
        <Container>
            <MyPagesMenu />
            <MySalesList />
        </Container>
    )
}