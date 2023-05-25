import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getHelperText } from '../../util/validate';
import { useMutation } from 'react-query';
import { axiosModule } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../api/cm_callsvc';
import { alertDialogOpenState, alertDialogState, headerState } from '../../atoms/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function SelectTeamPage(): ReactElement {
  const svc = useService();

  // 모임 만들기
  const {
    register: create_register,
    handleSubmit: create_handleSubmit,
    formState: { errors: create_errors },
  } = useForm({
    defaultValues: {
      teamNm: '',
      teamDesc: '팀 설명',
    },
  });

  // 모임 참가
  const {
    register: join_register,
    handleSubmit: join_handleSubmit,
    formState: { errors: join_errors },
  } = useForm({
    defaultValues: {
      joinCode: '',
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h5" variant="h5">
          반갑습니다!
        </Typography>

        <Box
          component="form"
          onSubmit={create_handleSubmit(svc._onCreateTeam)}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="모임명 입력(10자 이내)"
            type="text"
            inputProps={{ maxLength: 10 }}
            {...create_register('teamNm', { required: true })}
            error={create_errors.teamNm ? true : false}
            helperText={getHelperText(create_errors.teamNm?.type)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            모임 만들기
          </Button>
        </Box>

        <Divider flexItem />

        <Box
          component="form"
          onSubmit={join_handleSubmit(svc._onCheckJoinTeam)}
          noValidate
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="참여코드 입력(숫자 4자리)"
            type="number"
            inputProps={{ maxLength: 10 }}
            {...join_register('joinCode', { required: true, maxLength: 4 })}
            error={join_errors.joinCode ? true : false}
            helperText={getHelperText(join_errors.joinCode?.type)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            모임 참가
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

const useService = () => {
  const navi = useNavigate();
  const setOpenAlert = useSetRecoilState(alertDialogOpenState);
  const setAlertDialog = useSetRecoilState(alertDialogState);

  const _onCreateTeam = (data) => {
    console.log(data);
    createTeamMutation.mutate(data);
  };

  const _onCheckJoinTeam = async (data) => {
    const { joinCode } = data;
    let resMap = await getTeamByJoinCode(joinCode);
    const { teamNm, teamIdx, teamDesc } = resMap;

    setAlertDialog({
      title: '팀 참가 확인',
      content: `[${teamNm}]에 참가하시겠습니까?`,
      succFn: () => {
        joinTeamMutation.mutate(resMap);
      },
    });
    setOpenAlert(true);
  };

  const createTeamMutation = useMutation((prmMap) => {
    return axiosModule
      .post(`/team`, prmMap)
      .then((res) => {
        console.log(res);
        alert('모임이 만들어졌어요.');
        navi('/');
      })
      .catch(handleError);
  });

  const getTeamByJoinCode = (joinCode) => {
    return new Promise((resolve, reject) => {
      axiosModule
        .get(`/team/join-code/${joinCode}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch(handleError);
    });
  };

  const joinTeamMutation = useMutation((prmMap) => {
    const { teamNm, teamIdx, teamDesc } = prmMap;
    console.log('teamIdx', teamIdx);
    return axiosModule
      .post(`/team/${teamIdx}`, null)
      .then((res) => {
        console.log(res);
        alert('모임에 참가했어요.');
        navi('/');
      })
      .catch(handleError);
  });

  return {
    _onCreateTeam,
    _onCheckJoinTeam,
  };
};
