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
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const SignInPage = () => {
  const svc = useService();
  const navi = useNavigate();

  useEffect(() => {
    // 자동로그인
    if (localStorage.getItem("token")) {
      let tokenStr = localStorage.getItem("token");
      console.log('tokenStr',tokenStr);

      svc.setToken(JSON.parse(tokenStr))
      // sessionStorage.setItem("token", localStorage.getItem("token"));
      // navi('/');
    }
    // 아이디 저장
    if (localStorage.getItem("rememberId")){
      const memberId = localStorage.getItem("memberId");
      svc.setForm({
        ...svc.form,
        memberId : memberId
      });
    }
  }, []);

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
        <Typography component="h2" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSignIn)} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="아이디를 입력해주세요."
            type="text"
            autoFocus
            {...register('memberId', { required: true })}
            error={errors.memberId ? true : false}
            helperText={getHelperText(errors.memberId?.type)}
            onChange={svc.onChange}
            value={svc.form.memberId}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="비밀번호를 입력해주세요."
            type="password"
            onChange={svc.onChange}
            value={svc.form.memberPassword}
            error={errors.memberPassword ? true : false}
            {...register('memberPassword', { required: true })}
            helperText={getHelperText(errors.memberPassword?.type)}
          />
          <div style={{display:'flex', alignItems:'center',justifyContent:'space-around'}}>
            <FormControlLabel control={<Checkbox value={svc.rememberIDChecked} color="primary" name="rememberID" checked={svc.rememberIDChecked} onChange={svc.rememberIDCheckHandler}/>} label="아이디 저장" />
            <FormControlLabel control={<Checkbox value={svc.autoLoginChecked} name="autoLogin" color="primary" checked={svc.autoLoginChecked} onChange={svc.autoLoginCheckHandler}/>} label="자동 로그인" />
          </div>
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
  const [rememberIDChecked, setRememberIDChecked] = useState(false);
  const rememberIDCheckHandler = ({target}) => {
    setRememberIDChecked(!rememberIDChecked);
    console.log('아이디 저장 여부', target.checked);
  }
  const [autoLoginChecked, setAutoLoginChecked] = useState(false);
  const autoLoginCheckHandler = ({target}) => {
    setAutoLoginChecked(!autoLoginChecked);
    console.log('자동 로그인 여부', target.name, target.checked);
  }

  const navi = useNavigate();
  const [form, onChange, reset, setForm] = useInputs({
    memberId: '',
    memberPassword: '',
  });
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

        // 아이디 저장, true
        if(rememberIDChecked) {
          // form = { memberId, memberPassword}
          localStorage.setItem("rememberId", "y");
          localStorage.setItem("memberId", form.memberId);
        } else {
          localStorage.removeItem("rememberId");
          localStorage.removeItem("memberId");
        }
        // 자동로그인, true
        if(autoLoginChecked){
          localStorage.setItem("token", JSON.stringify({
              accessToken,
              refreshToken,
            })
          );

        }
        navi('/');
      })
      .catch(handleError);
  });

  return {
    signinMutation,
    form,
    onChange,
    setForm,
    _onLogin,
    rememberIDChecked,rememberIDCheckHandler,
    autoLoginChecked,autoLoginCheckHandler,
    setToken
  };
};

export default SignInPage;
