import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { alertToastOpenState, alertToastState, headerState, tokenState } from '../atoms/atom';
import { useAuth } from '../util/hooks';
import { axiosModule } from '../api/axios';
import { isEmptyObj } from '../util/cm_util';
import { Button, Divider, IconButton, Skeleton, Stack, Typography, Grid, Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import { useQuery } from 'react-query';
import { useMemberQuery } from '../api/queryHooks.js';

const MainPage = () => {
  const svc = useService();

  return (
    <Stack spacing={2}>
      {/* 공지영역 */}
      <Skeleton variant="rectangular" width="100%" height={150} />

      <Divider />

      {/* 게시글 목록 영역 */}
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Skeleton variant="circular" width={40} height={40} />
              </Grid>
              <Grid item xs={10}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
            </Grid>
          </Box>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
        </Stack>

        <Divider />

        <Stack spacing={1}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Skeleton variant="circular" width={40} height={40} />
              </Grid>
              <Grid item xs={10}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
            </Grid>
          </Box>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
        </Stack>

        <Divider />

        <Stack spacing={1}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Skeleton variant="circular" width={40} height={40} />
              </Grid>
              <Grid item xs={10}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
            </Grid>
          </Box>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={60} />
        </Stack>
      </Stack>
    </Stack>
  );
};

const useService = () => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState(headerState);

  const getMemberQuery = useMemberQuery();

  const renderHeader = (data) => {
    const { memberType, teamNm } = data;

    setHeaderState({
      left: (
        <Button onClick={() => navi('/team/info')}>
          {teamNm}
          <ChevronRightIcon />
        </Button>
      ),
      right: (
        <IconButton>
          <EditIcon />
        </IconButton>
      ),
    });
  };

  useEffect(() => {
    if (getMemberQuery.isSuccess) {
      const { teamMemberVos } = getMemberQuery.data.data;
      if (isEmptyObj(teamMemberVos)) {
        navi('/team/select');
      } else {
        renderHeader(teamMemberVos[0]);
      }
    }
  }, [getMemberQuery]);
};

export default MainPage;
