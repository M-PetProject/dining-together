import React, { useEffect } from 'react';
import {Container,Stack, Typography, FormLabel, FormGroup} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import {DiningButton, DiningInput, DiningTextField, DiningDate, DiningDateAndTime} from './component/index.d';

const DiningDetailsPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Stack spacing={4}>
                <DiningBox title={'회식명'} isRequired={true}>
                    <DiningInput placeholder={'한글 10자 이내'} />
                </DiningBox>
                <DiningBox title={'예정기간'} isRequired={true} guideMsg='예정기간 내 회식일자를 선정합니다.'>
                    <DiningDate />
                </DiningBox>
                <DiningBox title={'예산'} isRequired={true}>
                    <DiningInput placeholder={'30,000원'}/>
                    <CloseIcon fontSize='small' />
                    <DiningInput placeholder={'7명'} />
                    <DensityLargeIcon fontSize='small' />
                    <DiningInput 
                        placeholder={'210,000원'} 
                        isDisabled={true}
                    />
                </DiningBox>
                <DiningBox title={'설명'}>
                    <DiningTextField
                        placeholder={'한글 10자 이내'} 
                    />
                </DiningBox>
                <DiningBox title={'장소추천 마감일시'} isRequired={true}>
                    <DiningDateAndTime isDate={true} isTime={true} />
                </DiningBox>
                <DiningBox> 
                    <DiningButton btnType={'outlined'} name={'취소'} />
                    <DiningButton btnType={'contained'} name={'저장'} />
                </DiningBox>
            </Stack>
        </Container>
        
    );
};

const DiningBox = ({title, isRequired, guideMsg, children}) => {
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

export default DiningDetailsPage;