import {
  Autocomplete,
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { axiosModule } from '../../api/axios.js';
import { handleError } from '../../api/cm_callsvc.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpYup } from '../../util/yup.js';
import { useMemberDetailQuery, useTeamQuery } from '../../api/useQuerys.ts';
import { teamMemberState, userState, tokenState } from '../../atoms/atom.ts';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

const EditMemberPage = () => {
  const svc = useService();
  const memberId = useParams().userId;
  const memberName = svc.memberName;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpYup),
  });

  const onCompleteBasicInfo = async (formData) => {
    let isExistsId = await svc.checkExistsId(formData.memberId);
    console.log(isExistsId);
    if (isExistsId === false) {
      svc.setMemberBasicInfo(formData);
      handleStep(1)();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: 8,
          paddingBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h5" variant="h5">
          회원 정보 수정
        </Typography>
        <Box
          component="form"
          onKeyDown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              label="ID"
              name="memberId"
              type="text"
              autoFocus
              {...register('memberId')}
              error={errors.memberId ? true : false}
              helperText={errors.memberId?.message}
              value={memberId}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="NAME"
              name="membberName"
              type="text"
              value={memberName}
              {...register('memberName')}
              error={errors.memberName ? true : false}
              helperText={errors.memberName?.message}
              disabled
            />
          </>
          <>
            {/* 좋아하는 음식 combo box */}
            <Autocomplete
              fullWidth
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
          </>
          {/* onSubmit={handleSubmit(svc.onSignUp)} */}
          <Paper sx={{ position: 'fixed', bottom: 10, left: 0, right: 0 }} elevation={0}>
            <Container maxWidth="xs">
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={svc.onEdit}>
                내정보수정
              </Button>
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

  const memberId = useParams().userId;
  const teamInfo = useRecoilValue(teamMemberState);
  const teamIdx = teamInfo.teamIdx;

  const memberQuery = useMemberDetailQuery(memberId);
  const teamQuery = useTeamQuery(teamIdx);

  if (memberQuery.isLoading) return <div></div>;
  if (teamQuery.isLoading) return <div></div>;

  const { memberAllergyVos, memberHateFoodVos, memberIdx, memberLikeFoodVos, memberName } = memberQuery.data.data;
  const teamMemberList = teamQuery.data.data.teamMemberVoList;

  const [memberBasicInfo, setMemberBasicInfo] = useState({
    memberId,
    memberName,
  });
  const [memberEtcInfo, setMemberEtcInfo] = useState({
    memberAllergyVos: memberAllergyVos,
    memberHateFoodVos: memberHateFoodVos,
    memberLikeFoodVos: memberLikeFoodVos,
  });

  const onInputKeyword = (e) => {
    if (e.key != 'Enter' || e.target.value == '') return;

    let { name, value } = e.target;
    formKeyword = { ...formKeyword, [name]: value };

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

  const onEdit = () => {
    signupMutation.mutate({ ...memberBasicInfo, ...memberEtcInfo, teamMemberVos: teamMemberList });
  };

  const checkExistsId = async (id) => {
    let res = false;
    try {
      const { status, data } = await axiosModule.get(`/auth/member/${id}`);
      if (status === 200) {
        res = true;
        alert('이미 존재하는 회원입니다.');
      }
    } catch (err) {
      res = false;
    }
    return res;
  };

  //== useQuery, useMutation ==//
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
  console.log('getLikeFoodDataQuery', getLikeFoodDataQuery);
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
      .put(`/member`, form)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          alert('내정보수정이 완료되었습니다.');
          navi(`/member/${memberId}`);
        }
      })
      .catch(handleError);
  });

  return {
    signupMutation,
    onEdit,
    onInputKeyword,
    getLikeFoodDataQuery,
    getHateFoodDataQuery,
    getAllergyDataQuery,
    memberEtcInfo,
    setMemberEtcInfo,
    setMemberBasicInfo,
    checkExistsId,
    memberName,
  };
};

export default EditMemberPage;
