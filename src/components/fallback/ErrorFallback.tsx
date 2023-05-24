// 에러 로깅 가능
import { ReactElement } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ErrorFallback(err): ReactElement {
  console.log(err);
  const navi = useNavigate();
  return (
    <Stack justifyItems={'center'} alignItems={'center'} spacing={2}>
      <Typography variant={'h3'}>Error Page</Typography>
      <Typography variant={'body1'}>서비스 중 오류가 발생했습니다.</Typography>
      <Button variant={'contained'} onClick={() => navi('/')}>
        메인으로
      </Button>
    </Stack>
  );
}
