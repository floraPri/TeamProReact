import styled from "styled-components";
import * as React from 'react';
import {Table ,TableCell, TableRow, TableBody, Button, TableContainer} from "@mui/material";

const Container = styled.div`
    display: grid;
    justify-content: center;
    white-space: pre-line;
    font-size:12px;
    margin: 10px;
    width:100%;
`;

const Title = styled.div`
    text-align:center;
    font-size:20px;
    font-weight:600;
    margin:5px;
    padding: 20px;
    border-bottom : 1px solid #E7E7E7;
`;

const Input = styled.input`
  width: 500px;
  padding: 5px;
  margin: 0;
`;

const Textarea = styled.textarea`
  width: 500px;
  padding: 5px;
  margin: 0;
`;

const FileInput = styled.input`
`;

const cellStyle = {
    border: 'none',
    align: 'center', 
  };

//피드 등록
export default function MyFeedAdd(){
    return(
    <Container>
        <Title> 피드 등록하기 </Title>
        <form>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell>
                            <Input type="text" id="feed_title" name="title" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>내용</TableCell>
                        <TableCell><Textarea id="txt_content" name="content" /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>이미지</TableCell>
                        <TableCell>
                            <Input type="file" id="image" name="input_img" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={cellStyle}></TableCell>
                        <TableCell sx={cellStyle} align="center">
                            <Button active type="submit"> 수정 </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </form>
    </Container>
    );
}