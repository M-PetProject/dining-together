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
import { useForm } from 'react-hook-form';
import { getHelperText } from '../util/validate';

const SignUpPage = () => {
  const svc = useService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSignUp = (data) => {
    console.log(data);
    svc.signupMutation.mutate(data);
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSignUp)} noValidate sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="이름을 입력해주세요."
            type="text"
            error={errors.memberName ? true : false}
            {...register('memberName', { required: true })}
            helperText={getHelperText(errors.memberName?.type)}
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

  return { signupMutation };
};

export default SignUpPage;
