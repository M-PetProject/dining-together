import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { alertToastOpenState, alertToastState, headerState, tokenState } from '../atoms/atom';
import { isEmptyObj } from '../util/cm_util';
import {
  Button,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  Grid,
  Box,
  Card,
  CardHeader,
  Avatar,
  CardContent,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useGetNoticesQuery, useMemberQuery } from '../api/queryHooks.js';
import Carousel from 'react-material-ui-carousel';

const MainPage = () => {
  const svc = useService();

  const renderNotices = () => {
    if (!svc.getNoticesQuery.isSuccess) {
      return <Skeleton variant="rectangular" width="100%" height={150} />;
    }

    const { data: noticeData, limit } = svc.getNoticesQuery.data;
    const { data: notices } = noticeData;

    if (notices.length == 0) {
      return <div>등록된 공지가 없습니다.</div>;
    }
    return (
      <Carousel animation={'slide'}>
        {notices.map((notice) => {
          const { noticeIdx, title, content, memberIdx, memberVo, noticeDtStart, noticeDtEnd } = notice;
          const { memberName } = memberVo;
          return (
            <Card key={noticeIdx}>
              <CardHeader
                title={memberName}
                subheader={noticeDtStart}
                avatar={<Avatar>{memberName[0]}</Avatar>}
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {content}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Carousel>
    );
  };
  return (
    <Stack spacing={2}>
      {/* 공지영역 */}
      {renderNotices()}

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
  const teamIdx = getMemberQuery.data?.data.teamMemberVos[0].teamIdx;

  const getNoticesQuery = useGetNoticesQuery(teamIdx, { enabled: getMemberQuery.isSuccess });

  const renderHeader = (data) => {
    const { memberType, teamNm } = data;

    setHeaderState({
      left: {
        header: (
          <Button onClick={() => navi('/team/info')}>
            {teamNm}
            <ChevronRightIcon />
          </Button>
        ),
      },
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

  return {
    getNoticesQuery,
  };
};

export default MainPage;
