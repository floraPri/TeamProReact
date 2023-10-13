import styled from "styled-components";
import * as React from 'react';
import {Table ,TableCell, TableRow, TableBody, TableHead, TableContainer} from "@mui/material";
import { Input , TextField, Box } from '@mui/material';

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;
`;
const ariaLabel = { 'aria-label': 'description' };

{/** 오른쪽 영역 */}
{/** 회원정보 수정 폼 */}
export default function MyInfoEdit(){
    return(
    <RightContainer>
        <h3>회원정보 수정</h3>
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off">
            <Table>
                <TableRow>
                    <TableCell>아이디</TableCell>
                    <TableCell><Input defaultValue="testID" inputProps={ariaLabel} readOnly /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>비밀번호</TableCell>
                    <TableCell>
                        <TextField 
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>비밀번호 확인</TableCell>
                    <TableCell>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>고객명</TableCell>
                    <TableCell>
                        <TextField
                                id="standard-password-input"
                                type="text"
                                autoComplete="current-password"
                                variant="standard"
                                value="테스트"
                                readOnly
                                />
                    </TableCell>
                </TableRow>                
                <TableRow>
                    <TableCell>이메일</TableCell>
                    <TableCell>
                    <TextField
                        required
                        id="standard-required"
                        defaultValue="test"
                        variant="standard"
                            />
                    @
                    <TextField
                        required
                        id="standard-required"
                        defaultValue="naver.com"
                        variant="standard"
                            />                     
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>연락처</TableCell>
                    <TableCell>
                        010-1234-1234
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>성별</TableCell>
                    <TableCell>여</TableCell>
                </TableRow>
            </Table>
        </Box>
    </RightContainer>
    );
}