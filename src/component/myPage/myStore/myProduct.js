import styled from "styled-components";
import MyPagesMenu from "../myPagesMenu";
import MyProductList from "./myProductList";


const Container = styled.div`
  min-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

export default function MyProduct(){
    return(
        <Container>
            <MyPagesMenu />
            <MyProductList />
        </Container>
    );
}