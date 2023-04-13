import React, {useEffect} from 'react';
import {Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {BackButton} from '../../components/Buttons.jsx';
import {useNavigate} from 'react-router-dom';
import {api} from '../../api/cm_callsvc.js';
import {useQuery} from 'react-query';

function createData(id, name, calories, fat, carbs, protein) {
    return {id, name, calories, fat, carbs, protein};
}

const rows = [
    createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0),
    createData(4, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(5, 'Gingerbread', 356, 16.0, 49, 3.9)
];

const SamplePage = () => {
    /// 페이지 이동 hooks
    const navi = useNavigate();

    /* API 호출 방법 1 */
    /// 마지막 arguments에 설정된 state가 변할때마다 실행되는 hook 함수
    // (* 마지막 arguments가 빈배열[] 일 경우, 최초 1회만 실행함)
    useEffect(() => {
        return;
        api.get('/comm/tests', (res) => {
            console.log(res);
        }, (err) => {
            console.error(err);
        })
    }, []);


    /* API 호출 방법 2 */
    const {data:apiDataMap, isLoading} = useQuery('posts', async () => {
        return await api.getSuccess('/comm/tests');
    });


    const _onClickPost = () => navi('/sample/write');

    if(isLoading) return <div/>

    return (
        <Container>
            <BackButton/>
            <hr/>
            <Button variant="contained" onClick={_onClickPost}>글쓰기</Button>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>idx</TableCell>
                            <TableCell align="right">test1</TableCell>
                            <TableCell align="right">test2</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiDataMap?.data.map((row) => {
                            const {idx, test1, test2} = row;
                            return (
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row"> {idx} </TableCell>
                                    <TableCell align="right">{test1}</TableCell>
                                    <TableCell align="right">{test2}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default SamplePage;
