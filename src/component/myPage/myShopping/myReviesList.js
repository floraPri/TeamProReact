import styled from "styled-components";
import { Card,CardContent,Button,Typography,Box, CardHeader  } from '@mui/material';
import sytles from "./style.module.css";

const RightContainer = styled.div`
    width: 960px;
    padding-left: 50px;

`;

const RightInnerTitle = styled.div`
    width: 960px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`;

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function MyReviewList(){
    return(
        <RightContainer>
            <RightInnerTitle>
                <h3>나의 쇼핑 리뷰</h3>
            </RightInnerTitle>
            {/** 내가 쇼핑한 내역에 대한 상품리뷰 */}
            <ul className={sytles.ulStyle}>
                <li>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent className={sytles.borderLine}>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                    토너 아쿠아 웨지샌들
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    판매자: testID
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                구매 잘 했습니다..... 잘 사용할게요~
                            </Typography>
                            <div>
                                dfdfdfdf
                            </div>
                        </CardContent>
                    </Card>             
                </li>
            </ul>
        </RightContainer>
    );
}