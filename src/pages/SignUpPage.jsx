import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { axiosModule } from '../api/axios';
import { handleError } from '../api/cm_callsvc';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpYup } from '../util/yup';
import Gap from '../components/Gap';
import { useInputs } from '../util/hooks';

const SignUpPage = () => {
  const svc = useService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpYup),
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: 8,
          paddingBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(svc.onSignUp)}
          onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="ID"
            type="text"
            autoFocus
            {...register('memberId')}
            error={errors.memberId ? true : false}
            helperText={errors.memberId?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="PASSWORD"
            type="password"
            {...register('memberPassword')}
            error={errors.memberPassword ? true : false}
            helperText={errors.memberPassword?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="CONFIRM PASSWORD"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="NAME"
            type="text"
            {...register('memberName')}
            error={errors.memberName ? true : false}
            helperText={errors.memberName?.message}
          />
          <Divider />
          <Gap height={10} />
          {/* 좋아하는 음식 combo box */}
          <Autocomplete
            multiple
            getOptionLabel={(option) => option.foodNm}
            options={svc.getLikeFoodDataQuery.data ?? []}
            value={svc.memberEtcInfo.memberLikeFoodVos}
            onChange={(e, newValue) => {
              svc.setMemberEtcInfo({
                ...svc.memberEtcInfo,
                memberLikeFoodVos: newValue,
              });
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="like food"
                  margin="normal"
                  label="좋아하는 음식"
                  name="likeFood"
                  onKeyDown={svc.onInputKeyword}
                />
              );
            }}
          />
          {/* 싫어하는 음식 combo box */}
          <Autocomplete
            multiple
            getOptionLabel={(option) => option.foodNm}
            options={svc.getHateFoodDataQuery.data ?? []}
            value={svc.memberEtcInfo.memberHateFoodVos}
            onChange={(e, newValue) => {
              svc.setMemberEtcInfo({
                ...svc.memberEtcInfo,
                memberHateFoodVos: newValue,
              });
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="hate food"
                  margin="normal"
                  label="싫어하는 음식"
                  name="hateFood"
                  onKeyDown={svc.onInputKeyword}
                />
              );
            }}
          />
          {/* 알러지 정보 combo box */}
          <Autocomplete
            multiple
            getOptionLabel={(option) => option.allergyNm}
            options={svc.getAllergyDataQuery.data ?? []}
            value={svc.memberEtcInfo.memberAllergyVos}
            onChange={(e, newValue) => {
              svc.setMemberEtcInfo({
                ...svc.memberEtcInfo,
                memberAllergyVos: newValue,
              });
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="allergy"
                  margin="normal"
                  label="알러지 정보"
                  name="allergy"
                  onKeyDown={svc.onInputKeyword}
                />
              );
            }}
          />

          <Paper sx={{ position: 'fixed', bottom: 10, left: 0, right: 0 }} elevation={0}>
            <Container maxWidth="xs">
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                회원가입
              </Button>
              <p>
                계정이 있으신가요?&emsp;
                <Link to="/sign-in" variant="body2">
                  로그인
                </Link>
              </p>
            </Container>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

const useService = () => {
  const navi = useNavigate();

  // combo box에 입력된 키워드
  let formKeyword = {
    likeFood: '',
    hateFood: '',
    allergy: '',
  };
  const [memberEtcInfo, setMemberEtcInfo] = useState({
    memberAllergyVos: [],
    memberHateFoodVos: [],
    memberLikeFoodVos: [],
  });

  const onInputKeyword = (e) => {
    if (e.key != 'Enter' || e.target.value == '') return;

    let { name, value } = e.target;
    formKeyword = { ...formKeyword, [name]: value };

    console.log(formKeyword, name);

    switch (name) {
      case 'likeFood':
        getLikeFoodDataQuery.refetch();
        break;
      case 'hateFood':
        getHateFoodDataQuery.refetch();
        break;
      case 'allergy':
        getAllergyDataQuery.refetch();
        break;
    }
  };

  const queryOption = {
    enabled: false,
    refetchOnWindowFocus: false,
  };
  const getLikeFoodDataQuery = useQuery(
    ['likeFood', formKeyword.likeFood],
    async () => {
      let res = await axiosModule.get(`/comm/food/${formKeyword.likeFood}`);
      return res.data;
    },
    queryOption
  );
  const getHateFoodDataQuery = useQuery(
    ['hateFood', formKeyword.hateFood],
    async () => {
      let res = await axiosModule.get(`/comm/food/${formKeyword.hateFood}`);
      return res.data;
    },
    queryOption
  );
  const getAllergyDataQuery = useQuery(
    ['allergy', formKeyword.allergy],
    async () => {
      let res = await axiosModule.get(`/comm/allergy/${formKeyword.allergy}`);
      return res.data;
    },
    queryOption
  );

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

  const onSignUp = (data) => {
    console.log(data);
    console.log('memberEtcInfo', memberEtcInfo);
    signupMutation.mutate({ ...data, ...memberEtcInfo });
  };

  return {
    signupMutation,
    onSignUp,
    onInputKeyword,
    getLikeFoodDataQuery,
    getHateFoodDataQuery,
    getAllergyDataQuery,
    memberEtcInfo,
    setMemberEtcInfo,
  };
};

export default SignUpPage;
