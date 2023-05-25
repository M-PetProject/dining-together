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
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useInputs } from '../util/hooks.jsx';
import { useMutation } from 'react-query';
import { axiosModule } from '../api/axios.js';
import { handleError } from '../api/cm_callsvc.js';
import { useForm } from 'react-hook-form';
import { getHelperText } from '../util/validate.js';
import { getLocalStorage, getSession, isEmptyObj, setLocalStorage } from '../util/cm_util.js';
import { nvl } from '../util/cm_util.js';
import { LocalStorageKey } from '../enum/enum';
import useAutoSignIn from '../hooks/useAutoSignIn';

const SignInPage = () => {
  const svc = useService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      memberId: '',
      memberPassword: '',
    },
  });

  useEffect(() => {
    // 아이디 저장
    if (nvl(JSON.parse(getLocalStorage('is_remember_id')), false)) {
      const memberId = localStorage.getItem('remember_id');
      setValue('memberId', memberId);
    }
    // 자동로그인
    if (nvl(JSON.parse(getLocalStorage('is_auto_login')), false)) {
      let token = JSON.parse(getLocalStorage('token'));
      console.log(token);
      svc.setToken(token);
    }
  }, []);

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="rememberID"
                  checked={svc.rememberIDChecked}
                  onChange={svc.rememberIDCheckHandler}
                />
              }
              label="아이디 저장"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="autoLogin"
                  checked={svc.autoLoginChecked}
                  onChange={svc.autoLoginCheckHandler}
                />
              }
              label="자동 로그인"
            />
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
  const navi = useNavigate();
  const [form, onChange, reset, setForm] = useInputs({
    memberId: '',
    memberPassword: '',
  });
  const { user, setUser, token, setToken } = useAuth();
  const { setAutoSignIn, setAutoSignOut } = useAutoSignIn();

  const [rememberIDChecked, setRememberIDChecked] = useState(nvl(JSON.parse(getLocalStorage('is_remember_id')), false));
  const rememberIDCheckHandler = ({ target }) => {
    setRememberIDChecked(target.checked);
  };
  const [autoLoginChecked, setAutoLoginChecked] = useState(nvl(JSON.parse(getLocalStorage('is_auto_login')), false));
  const autoLoginCheckHandler = ({ target }) => {
    setAutoLoginChecked(target.checked);
  };

  const signinMutation = useMutation((form) => {
    return axiosModule
      .post(`/auth/login`, form)
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        console.log(res.data);
        setToken({
          accessToken,
          refreshToken,
        });
        setUser(form);
        rememberMe(form, accessToken, refreshToken);
      })
      .catch(handleError);
  });

  const rememberMe = (form, accessToken, refreshToken) => {
    // 아이디 저장, true
    if (rememberIDChecked) {
      // form = { memberId, memberPassword}
      setLocalStorage(LocalStorageKey.IsRememberId, rememberIDChecked);
      setLocalStorage(LocalStorageKey.RememberId, form.memberId);
    } else {
      localStorage.removeItem(LocalStorageKey.IsRememberId);
      localStorage.removeItem(LocalStorageKey.RememberId);
    }

    // 자동로그인, true
    if (autoLoginChecked) {
      setAutoSignIn({ accessToken, refreshToken });
    } else {
      setAutoSignOut();
    }
  };

  return {
    signinMutation,
    form,
    onChange,
    setForm,
    rememberIDChecked,
    rememberIDCheckHandler,
    autoLoginChecked,
    autoLoginCheckHandler,
    setToken,
  };
};

export default SignInPage;
