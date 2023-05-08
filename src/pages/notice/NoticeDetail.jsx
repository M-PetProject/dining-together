import React, { useEffect } from 'react';
import { headerState } from '../../atoms/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Avatar, Button, Card, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import { teamMemberState } from '../../atoms/atom';
import { useNoticeDetailQuery } from '../../api/useQuerys';
import { CommentType } from '../../enum/enum';
import Comment from '../../components/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { dateFormat } from '../../util/cm_util';
import MessageIcon from '@mui/icons-material/Message';

const NoticeDetail = () => {
  const { idx: noticeIdx } = useParams();
  const svc = useService({ noticeIdx });

  if (svc.noticeQuery.isLoading) {
    return 'loading';
  }

  console.log(svc.noticeQuery.data.data);
  const { title, content, memberVo, noticeDtStart, noticeDtEnd, noticeComments } = svc.noticeQuery.data.data;
  const { memberId, memberName } = memberVo;
  const { totalItems } = noticeComments;
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader
          title={memberName}
          subheader={`${dateFormat(noticeDtStart)} - ${dateFormat(noticeDtEnd)}`}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <MessageIcon />
            <span>{totalItems}</span>
          </div>
          <Typography variant="body2" color="text.secondary" align="right"></Typography>
        </CardContent>
      </Card>
      <Comment commentType={CommentType.NOTC} teamIdx={svc.teamInfoState.teamIdx} postIdx={noticeIdx} />
    </Stack>
  );
};

const useService = ({ noticeIdx }) => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState(headerState);
  const teamInfoState = useRecoilValue(teamMemberState);

  const renderHeader = () => {
    setHeaderState({
      left: {
        header: (
          <Button onClick={() => navi('/')}>
            <ChevronLeftIcon />
            <p>공지상세</p>
          </Button>
        ),
      },
    });
  };

  const noticeQuery = useNoticeDetailQuery(teamInfoState.teamIdx, noticeIdx);

  useEffect(() => {
    renderHeader();
  }, []);

  return {
    noticeQuery,
    teamInfoState,
  };
};

export default NoticeDetail;
