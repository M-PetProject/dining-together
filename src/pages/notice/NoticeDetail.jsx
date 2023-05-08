import React, { useEffect } from 'react';
import { headerState } from '../../atoms/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button, IconButton } from '@mui/material';
import { teamMemberState } from '../../atoms/atom';
import { useNoticeDetailQuery } from '../../api/useQuerys';
import { CommentType } from '../../enum/enum';
import Comment from '../../components/Comment';

const NoticeDetail = () => {
  const { idx: noticeIdx } = useParams();
  const svc = useService({ noticeIdx });

  if (svc.noticeQuery.isLoading) {
    return 'loading';
  }

  //   console.log(svc.noticeQuery.data);
  return (
    <div style={{ overflow: 'auto' }}>
      NoticeDetail
      <Comment
        commentType={CommentType.NOTC}
        teamIdx={svc.teamInfoState.teamIdx}
        postIdx={noticeIdx}
        commentList={svc.noticeQuery.data.data.noticeComments.data}
      />
    </div>
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
