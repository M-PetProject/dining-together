import React, { Component } from 'react';
import {Container,Stack, Typography, FormLabel, FormGroup, Box} from '@mui/material';
import {DiningButton, DiningInput, DiningTextField} from '../diningMain/component/index.d';
import DiningImage from '../diningMain/component/DiningImage';

class RcmPalceDetailsPage extends Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Stack spacing={4}>
                    <RcmBox title={'장소명'} isRequired={true}>
                        <DiningInput placeholder={'한글 10자 이내'} />
                    </RcmBox>
                    <RcmBox title={'소개'}>
                        <DiningTextField placeholder={'한글 60자 이내'} />
                    </RcmBox>
                    <RcmBox title={'평점'} isRequired={true}>
                        <DiningInput placeholder={'숫자만 예)5.0'} />
                    </RcmBox>
                    <RcmBox title={'영업시간'}>
                        <DiningInput placeholder={'예) 매일 10:00 ~ 23:00'} />
                    </RcmBox>
                    <RcmBox title={'사진'} isRequired={true}>
                        <DiningImage />
                    </RcmBox>
                    <RcmBox title={'링크URL'} isRequired={true} guideMsg={'외부 페이지로 이동하여 상세정보를 확인할 수 있습니다.'}>
                        <DiningInput />
                    </RcmBox>

                    <RcmBox> 
                        <DiningButton btnType={'outlined'} name={'취소'} />
                        <DiningButton btnType={'contained'} name={'저장'} />
                    </RcmBox>
                </Stack>
            </Container>
        );
    }
}

const RcmBox = ({title, isRequired, guideMsg, children}) => {
    return ( 
        <div>
            <FormLabel component="legend" required={isRequired} >
                {title}
            </FormLabel>
            <FormGroup>
                <Stack direction="row" alignItems='center' spacing={1}>
                    {children}
                </Stack>
                {guideMsg && 
                    <Typography mt={0.5} ml={1}>
                            {guideMsg}
                    </Typography>
                }
            </FormGroup>
        </div>
    );
};

export default RcmPalceDetailsPage;