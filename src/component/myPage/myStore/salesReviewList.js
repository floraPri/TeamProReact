import styled from "styled-components";
import { Card,CardActions,CardContent,Button,Typography,Box  } from '@mui/material';
import styles from "./salesReviewsStyle.module.css";

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
  


export default function SalesReviewList(){
    return(
        <RightContainer>
            <RightInnerTitle>
                <h3>memberID님과의 거래 후기</h3>
            </RightInnerTitle>
            <ul className={styles.listUl}>
                <li>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                testID님과의 거래
                            </Typography>
                            <Typography variant="h5" component="div">
                                쿨거래 감사합니다!!!!!!!
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                testID님
                            </Typography>
                            <Typography variant="body2">
                                빠른 거래 깨끗한 상품... 정말 감사합니다. 번창하세요!
                            <br />
                            </Typography>
                        </CardContent>
                        {/** 
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                        */}
                    </Card>
                </li>
                <li>
                <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                                쿨거래 감사합니다!!!!!!!
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                testID님
                            </Typography>
                            <Typography variant="body2">
                                빠른 거래 깨끗한 상품... 정말 감사합니다. 번창하세요!
                            <br />
                            </Typography>
                        </CardContent>
                        {/** 
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                        */}
                    </Card>
                </li>
                <li>
                <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                                쿨거래 감사합니다!!!!!!!
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                testID님
                            </Typography>
                            <Typography variant="body2">
                                빠른 거래 깨끗한 상품... 정말 감사합니다. 번창하세요!
                            <br />
                            </Typography>
                        </CardContent>
                        {/** 
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                        */}
                    </Card>
                </li>
                <li>
                <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                                쿨거래 감사합니다!!!!!!!
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                testID님
                            </Typography>
                            <Typography variant="body2">
                                빠른 거래 깨끗한 상품... 정말 감사합니다. 번창하세요!
                            <br />
                            </Typography>
                        </CardContent>
                        {/** 
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                        */}
                    </Card>
                </li>
            </ul>
        </RightContainer>
    );
}