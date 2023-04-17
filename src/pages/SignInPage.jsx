import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import { useErrorHandle, useInputs } from '../util/hooks.jsx';
import { cm_util } from '../util/cm_util.js';
import { useMutation } from 'react-query';
import { axiosModule } from '../api/axios.js';

const SignInPage = () => {
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={svc._onLogin} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="아이디/비밀번호 저장" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            로그인
          </Button>
          <Grid container>
            <Grid item>
              아직 계정이 없으신가요?&emsp;
              <Link to="/sign-up" variant="body2">
                회원가입
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
  });

  const signinMutation = useMutation((form) => {
    return axiosModule
      .post(`/auth/login`, form)
      .then((res) => {
        navi('/');
      })
      .catch(useErrorHandle);
  });

  const _onLogin = (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(form)) {
      if (cm_util.isEmptyObj(value)) {
        return alert('필수입력값을 확인해주세요.');
      }
    }

    signinMutation.mutate(form);
  };

  return {
    form,
    onChange,
    _onLogin,
  };
};

export default SignInPage;
