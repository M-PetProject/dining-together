import React, { useEffect, useState } from 'react';
import {
  alertDialogOpenState,
  alertDialogState,
  alertToastOpenState,
  alertToastState,
  headerState,
} from '../../atoms/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogContentText,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { teamMemberState } from '../../atoms/atom';
import { useNoticeDetailQuery } from '../../api/useQuerys.ts';
import { CommCommentType } from '../../enum/enum';
import CommComment from '../../components/CommComment.tsx';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { dateFormat } from '../../util/cm_util';
import MessageIcon from '@mui/icons-material/Message';
import { axiosModule } from '../../api/axios.js';
import { handleError } from '../../api/cm_callsvc.js';

const NoticeDetail = () => {
  const { idx: noticeIdx } = useParams();
  const svc = useService({ noticeIdx });

  if (svc.noticeQuery.isLoading) {
    return 'loading';
  }

  const { title, content, memberVo, noticeDtStart, noticeDtEnd, noticeComments } = svc.noticeQuery.data.data;
  const { memberId, memberName, memberIdx: noticeMemberIdx } = memberVo;
  const { totalItems } = noticeComments;
  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader
          title={memberName}
          subheader={`${dateFormat(noticeDtStart)} - ${dateFormat(noticeDtEnd)}`}
          avatar={<Avatar>{memberName[0]}</Avatar>}
          action={
            noticeMemberIdx == svc.teamInfoState.memberIdx ? (
              <IconButton onClick={svc.onClickMoreButton}>
                <MoreVertIcon />
              </IconButton>
            ) : (
              ''
            )
          }
        />
        <Menu id="basic-menu" anchorEl={svc.menuAnchorEl} open={svc.openMenu} onClose={() => svc.setOpenMenu(false)}>
          <MenuItem onClick={svc.handleModify}>수정</MenuItem>
          <MenuItem onClick={svc.handleDelete}>삭제</MenuItem>
        </Menu>
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
      <CommComment commentType={CommCommentType.NOTC} teamIdx={svc.teamInfoState.teamIdx} postIdx={noticeIdx} />
    </Stack>
  );
};

const useService = ({ noticeIdx }) => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState(headerState);
  const teamInfoState = useRecoilValue(teamMemberState);

  const [openMenu, setOpenMenu] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const setOpenAlert = useSetRecoilState(alertDialogOpenState);
  const setAlert = useSetRecoilState(alertDialogState);
  const setOpenToast = useSetRecoilState(alertToastOpenState);
  const setToast = useSetRecoilState(alertToastState);

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

  function onClickMoreButton(e) {
    setMenuAnchorEl(e.currentTarget);
    setOpenMenu(!openMenu);
  }

  function handleModify() {
    navi(`/notice/edit/${noticeIdx}`);
  }
  function handleDelete() {
    setOpenAlert(true);
    setAlert({
      title: '공지 삭제',
      content: <DialogContentText>삭제하시겠습니까?</DialogContentText>,
      succFn: deleteNotice,
    });
  }

  function deleteNotice() {
    let url = `/notice/${teamInfoState.teamIdx}/${noticeIdx}`;
    axiosModule
      .delete(url)
      .then((res) => {
        // console.log(res);
        setOpenToast(true);
        setToast('삭제되었습니다.');
        navi('/');
      })
      .catch(handleError);
  }

  useEffect(() => {
    renderHeader();
  }, []);

  return {
    noticeQuery,
    teamInfoState,
    onClickMoreButton,
    openMenu,
    setOpenMenu,
    menuAnchorEl,
    handleModify,
    handleDelete,
  };
};

export default NoticeDetail;
