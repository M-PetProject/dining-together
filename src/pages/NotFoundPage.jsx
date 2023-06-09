import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navi = useNavigate();
  return (
    <Stack justifyItems={'center'} alignItems={'center'} spacing={2}>
      <Typography variant={'h3'}>NotFound Page</Typography>
      <Typography variant={'body1'}>페이지를 찾지 못했습니다.</Typography>
      <Button variant={'contained'} onClick={() => navi('/')}>
        메인으로
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
