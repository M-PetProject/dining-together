import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useMutation, useQuery} from 'react-query';
import {api} from '../../api/cm_callsvc.js';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, CardActions, CardContent, CardHeader, Container, TextField} from '@mui/material';
import {BackButton} from '../../components/Buttons.jsx';
import Gap from '../../components/Gap.jsx';
import {axiosModule} from '../../api/axios.js';

const SampleDetailPage = (props) => {
    // 0. 서비스 로직 분리 ( use~ 형식 )
    const svc = useService();


    // 3-1. 데이터가 로딩중일 때
    if(svc.getDataQuery.isLoading) {
        return <div></div>
    }

    // 3-2. 데이터 return 이 완료되었을떄
    const {test1, test2} = svc.getDataQuery.data;
    return (
        <Container>
            <BackButton/>
            <hr/>

            <Gap width={10} height={10}/>

            <Card elevation={8}>
                <CardHeader
                    title='게시판 ID'
                    subheader={`#${svc.idx}`}
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
                        value={test1}
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
                        value={test2}
                        disabled={true}
                    />

                </CardContent>

                <CardActions>
                    <Button size="small" onClick={() => svc._onMoveList()} variant={'contained'}>목록으로</Button>
                    <Button size="small" onClick={() => svc._onModify( svc.getDataQuery.data)} variant={'outlined'}>수정</Button>
                    <Button size="small" onClick={() => svc._onDelete( svc.idx)} variant={'outlined'} color="error">삭제</Button>
                </CardActions>


            </Card>

        </Container>
    );
};

/// 서비스 로직
const useService = () => {
    const navi = useNavigate();

    // 1. 목록페이지에서 선택한 [idx] 값을 URL Param에서 가져온다..
    const { idx } = useParams();

    // 2. idx 를 통해, 실행될 GET API를 호출한다.
    const getDataQuery = useQuery(`post_${idx}`, async () => {
        return await api.getSuccess(`/comm/test?idx=${idx}`);
    });

    const deleteMutation = useMutation((idx) => {
        return axiosModule.delete(`/comm/test?idx=${idx}`).then(() => {
            alert('삭제가 완료되었습니다.');
            navi(-1);
        });
    })


    const _onMoveList = () => {
        navi('/sample/list');
    }

    const _onModify = (data) => {
        navi('/sample/write', {
            state : data
        })
    }

    const _onDelete = (idx) => {
        if(confirm('삭제하시겠습니까?')) {
            deleteMutation.mutate(idx);
        }

    }

    return {
        idx,
        getDataQuery,
        _onMoveList,
        _onModify,
        _onDelete
    }
}

export default SampleDetailPage;
