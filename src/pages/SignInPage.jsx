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
import { useAuth, useInputs } from '../util/hooks.jsx';
import { cm_util, setSession } from '../util/cm_util.js';
import { useMutation } from 'react-query';
import { axiosModule } from '../api/axios.js';
import { handleError } from '../api/cm_callsvc.js';
import { useForm } from 'react-hook-form';
import { getHelperText } from '../util/validate.js';

const SignInPage = () => {
  const svc = useService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberId: '',
      memberPassword: '',
    },
  });
  const onSignIn = (data) => {
    console.log(data);
    svc.signinMutation.mutate(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSignIn)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="아이디를 입력해주세요."
            type="text"
            autoFocus
            error={errors.memberId ? true : false}
            {...register('memberId', { required: true })}
            helperText={getHelperText(errors.memberId?.type)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="비밀번호를 입력해주세요."
            type="password"
            error={errors.memberPassword ? true : false}
            {...register('memberPassword', { required: true })}
            helperText={getHelperText(errors.memberPassword?.type)}
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
  const { user, setUser, token, setToken } = useAuth();

  const signinMutation = useMutation((form) => {
    return axiosModule
      .post(`/auth/login`, form)
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        setToken({
          accessToken,
          refreshToken,
        });
        setUser(form);
        navi('/');
      })
      .catch(handleError);
  });

  return {
    signinMutation,
  };
};

export default SignInPage;
