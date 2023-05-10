import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  alertDialogOpenState,
  alertDialogState,
  alertToastOpenState,
  alertToastState,
  headerState,
  tokenState,
} from '../atoms/atom';
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
  List,
  ListItem,
  ListItemButton,
  Container,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import { useNoticesQuery, useMemberQuery } from '../api/useQuerys.js';
import Carousel from 'react-material-ui-carousel';
import { useAuth } from '../util/hooks';
import { reissue } from '../api/cm_callsvc';

const MainPage = () => {
  const svc = useService();

  const renderNotices = () => {
    if (!svc.getNoticesQuery.isSuccess) {
      return <Skeleton variant="rectangular" width="100%" height={150} />;
    }

    console.log(svc.getNoticesQuery.data);
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
            <Link key={noticeIdx} to={'/notice/' + noticeIdx}>
              <Card>
                <CardHeader
                  title={memberName}
                  subheader={`${noticeDtStart} - ${noticeDtEnd}`}
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
            </Link>
          );
        })}
      </Carousel>
    );
  };

  const renderDiningRound = () => {
    return (
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
    );
  };
  return (
    <Stack spacing={2}>
      {/* 공지영역 */}
      <Stack gap={1}>
        <Stack direction={'row'} alignItems={'center'} gap={3}>
          <Button variant={'outlined'}>
            <CampaignRoundedIcon />
            공지사항
          </Button>
        </Stack>
        {renderNotices()}
      </Stack>

      <Divider />

      {/* 게시글 목록 영역 */}
      <Stack gap={1}>
        <Stack direction={'row'} alignItems={'center'} gap={3}>
          <Button variant={'outlined'}>
            <LocalDiningRoundedIcon />
            회식
          </Button>
        </Stack>
        {renderDiningRound()}
      </Stack>
    </Stack>
  );
};

const useService = () => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState(headerState);
  const { setUser, teamMember, setTeamMember } = useAuth();

  const getMemberQuery = useMemberQuery();
  const { teamIdx } = teamMember;

  const getNoticesQuery = useNoticesQuery(teamIdx, { enabled: !!teamIdx });

  const setOpenAlert = useSetRecoilState(alertDialogOpenState);
  const setAlertDialog = useSetRecoilState(alertDialogState);
  const onClickPostButton = () => {
    console.log('onClickPostButton');
    setAlertDialog({
      title: '등록하기',
      content: (
        <Stack gap={2}>
          <Button variant="contained" onClick={toNoticeNew}>
            공지등록
          </Button>
          <Button variant="contained" color="info">
            회식등록
          </Button>
        </Stack>
      ),
    });
    setOpenAlert(true);
  };
  const toNoticeNew = (e) => {
    setOpenAlert(false);
    navi('/notice/new');
  };

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
        <IconButton onClick={onClickPostButton}>
          <EditIcon />
        </IconButton>
      ),
    });
  };

  useEffect(() => {
    if (getMemberQuery.isSuccess) {
      const { teamMemberVos } = getMemberQuery.data.data;
      console.log(getMemberQuery.data.data);
      if (isEmptyObj(teamMemberVos)) {
        navi('/team/select');
      } else {
        renderHeader(teamMemberVos[0]);
        setUser(getMemberQuery.data.data);
        setTeamMember(teamMemberVos[0]);
      }
    }
  }, [getMemberQuery]);

  return {
    getNoticesQuery,
  };
};

export default MainPage;
