import React, {useEffect} from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {BackButton} from '../../components/Buttons.jsx';
import {useNavigate} from 'react-router-dom';
import {exec} from '../../api/cm_callsvc.js';

function createData(id, name, calories, fat, carbs, protein) {
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData(1,'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(2,'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(3,'Eclair', 262, 16.0, 24, 6.0),
    createData(4,'Cupcake', 305, 3.7, 67, 4.3),
    createData(5,'Gingerbread', 356, 16.0, 49, 3.9),
];

const SamplePage = () => {
    const navi = useNavigate();
    const _onClickPost = () => {
        navi('/sample/write');
    }

    useEffect(() => {
        exec.getSuccess('/comm/tests', (data) => {
            console.log(data);
        }, (err) => {
            console.error(err);
        })
    }, []);


    return (
        <div>
            <div>
                <BackButton />
            </div>

            <Button variant="contained" onClick={_onClickPost}>글쓰기</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SamplePage;
