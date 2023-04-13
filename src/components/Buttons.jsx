import React from 'react';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export const BackButton = () => {
    const navigate = useNavigate();
    return <Button variant="outlined" onClick={() => navigate(-1)}>뒤로가기</Button>
}



