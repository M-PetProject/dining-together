import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInputs } from '../util/hooks';
import { useMutation } from 'react-query';
import { axiosModule } from '../api/axios';
import { cm_util } from '../util/cm_util';
import { handleError } from '../api/cm_callsvc';

const SignUpPage = () => {
  const svc = useService();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={svc._onSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="memberId"
            label="아이디를 입력해주세요."
            type="text"
            autoFocus
            onChange={svc.onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="memberPassword"
            label="비밀번호를 입력해주세요."
            type="password"
            onChange={svc.onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="memberName"
            label="이름을 입력해주세요."
            type="text"
            onChange={svc.onChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            회원가입
          </Button>
          <Grid container>
            <Grid item>
              계정이 있으신가요?&emsp;
              <Link to="/sign-in" variant="body2">
                로그인
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const useService = () => {
  const navi = useNavigate();
  const [form, onChange] = useInputs({
    memberId: '',
    memberPassword: '',
    memberName: '',
  });

  const signupMutation = useMutation((form) => {
    return axiosModule
      .post(`/auth/signup`, form)
      .then((res) => {
        if (res.status === 200) {
          alert('회원가입이 완료되었습니다.');
          navi('/sign-in');
        }
      })
      .catch(handleError);
  });

  const _onSignup = (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(form)) {
      if (cm_util.isEmptyObj(value)) {
        return alert('필수입력값을 확인해주세요.');
      }
    }
    signupMutation.mutate(form);
  };

  return {
    form,
    onChange,
    _onSignup,
  };
};

export default SignUpPage;
