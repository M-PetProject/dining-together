import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from 'react-query';
import {api} from '../../api/cm_callsvc.js';
import {useParams} from 'react-router-dom';
import {Button, Card, CardActions, CardContent, CardHeader, Container, TextField} from '@mui/material';
import {BackButton} from '../../components/Buttons.jsx';
import Gap from '../../components/Gap.jsx';

const SampleDetailPage = (props) => {
    // 1. 목록페이지에서 선택한 [idx] 값을 URL Param에서 가져온다..
    const { idx } = useParams();

    // 2. idx 를 통해, 실행될 GET API를 호출한다.
    const {data:apiDataMap, isLoading} = useQuery(`post_${idx}`, async () => {
        return await api.getSuccess(`/comm/test?idx=${idx}`);
    });

    // 3-1. 데이터가 로딩중일 때
    if(isLoading) {
        return <div></div>
    }

    // 3-2. 데이터 return 이 완료되었을떄
    console.log('apiDataMap', apiDataMap);
    const {test1, test2} = apiDataMap;
    return (
        <Container>
            <BackButton/>
            <hr/>

            <Gap width={10} height={10}/>

            <Card elevation={8}>
                <CardHeader
                    title='게시판 ID'
                    subheader={`#${idx}`}
                />

                <CardContent>
                    <TextField
                        id="title"
                        label="게시판 제목"
                        helperText=""
                        variant="standard"
                        fullWidth={true}
                        /* name => key 값이 됩니다.*/
                        name='test1'
                        defaultValue={test1}
                        disabled={true}
                    />
                    <Gap height={20}/>
                    <TextField
                        id="contents"
                        label="내용"
                        helperText=""
                        variant="standard"
                        fullWidth={true}
                        multiline={true}
                        rows={4}
                        /* name => key 값이 됩니다.*/
                        name='test2'
                        defaultValue={test2}
                        disabled={true}
                    />

                </CardContent>

                <CardActions>
                    {/*<Button size="small" onClick={_onSave} variant={'contained'}>저장</Button>*/}
                    {/*<Button size="small" onClick={_onCancel}>취소</Button>*/}
                </CardActions>


            </Card>

        </Container>
    );
};

export default SampleDetailPage;
