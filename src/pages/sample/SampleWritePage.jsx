import React from 'react';
import {BackButton} from '../../components/Buttons.jsx';
import {Button, Card, CardActions, CardContent, CardHeader, Container, FormControl, FormHelperText, Grid, Input, InputLabel, Paper, Stack, TextField} from '@mui/material';
import Gap from '../../components/Gap.jsx';
import {useNavigate} from 'react-router-dom';
import {useInputs} from '../../util/hooks.jsx';

const SampleWritePage = () => {
    const navi = useNavigate();
    const [form, onChange, reset] = useInputs({
        idx: "", test1: '', test2 : ''
    });
    const { idx, test1, test2 } = form;

    const _onCancel = () => {
        navi(-1);
    }

    const _onSave = () => {
        console.log(form);
    }

    return (
        <Container>
            <BackButton/>
            <hr/>

            <Gap width={10} height={10}/>

            <Card elevation={8}>
                <CardHeader
                    title='게시판 ID'
                    subheader={idx}
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
                        onChange={onChange}
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
                        onChange={onChange}
                    />

                </CardContent>

                <CardActions>
                    <Button size="small" onClick={_onSave} variant={'contained'}>저장</Button>
                    <Button size="small" onClick={_onCancel}>취소</Button>
                </CardActions>


            </Card>

        </Container>
    );
};

export default SampleWritePage;
