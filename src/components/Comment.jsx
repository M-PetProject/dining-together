import React, { useEffect, useState } from 'react';

import FixedBottom from './FixedBottom';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { getHelperText } from '../util/validate';
import { postComment } from '../api/useMutations';
import { dateFormat } from '../util/cm_util';
import { useInfiniteQuery } from 'react-query';
import { axiosModule } from '../api/axios';
import { CommentType } from '../enum/enum';

export default function Comment({ commentType, postIdx, teamIdx }) {
  const svc = useService({ commentType, postIdx, teamIdx });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      content: '',
    },
  });

  if (svc.commentQueryStatus == 'loading') return 'comment loading...';

  return (
    <>
      <List sx={{ width: '100%' }}>
        {svc.commentQueryData.pages.map((commentPage) => {
          return commentPage.data.map((comment) => {
            const { commentIdx, title, content, childrenCnt, regDate, memberId = '작성자' } = comment;
            return (
              <ListItem key={commentIdx}>
                <ListItemAvatar>
                  <Avatar>{memberId[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      {memberId}&emsp;&emsp;
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                        {dateFormat(regDate)}
                      </Typography>
                    </>
                  }
                  secondary={<>{content}</>}
                />
              </ListItem>
            );
          });
        })}

        {svc.hasNextPage ? (
          <ListItem onClick={svc.fetchNextPage}>
            <Button variant="contained">더보기</Button>
          </ListItem>
        ) : (
          ''
        )}
      </List>
      <FixedBottom>
        <Box component="form" onSubmit={handleSubmit(svc.onPostComment)} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="댓글을 입력해주세요."
            type="text"
            autoFocus
            {...register('content', { required: true })}
            error={errors.content ? true : false}
            helperText={getHelperText(errors.content?.type)}
            InputProps={{
              endAdornment: (
                <Button type="submit" variant="contained">
                  쓰기
                </Button>
              ),
            }}
          />
        </Box>
      </FixedBottom>
    </>
  );
}

const useService = (props) => {
  const { commentType, postIdx, teamIdx } = props;

  const commentMutation = postComment({
    commentType,
    teamIdx,
    postIdx,
    thenFn: (res) => {
      alert(res.data);
    },
  });

  const onPostComment = (data) => {
    const prmMap = {
      title: 'title',
      content: data.content,
      useYn: 'Y',
    };
    console.log('onPostComment.prmMap', prmMap);
    commentMutation.mutate(prmMap);
  };

  const {
    status: commentQueryStatus,
    data: commentQueryData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['comments', teamIdx, postIdx],
    async ({ queryKey, pageParam = 1 }) => {
      let res;
      switch (commentType) {
        case CommentType.NOTC: {
          res = await axiosModule.get(`/notice/${teamIdx}/${postIdx}/comments?pageNo=${pageParam}`);
          break;
        }
      }
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.pageNo < lastPage.endPage) {
          return lastPage.pageNo + 1;
        }
      },
    }
  );
  return {
    onPostComment,
    commentQueryStatus,
    commentQueryData,
    fetchNextPage,
    hasNextPage,
  };
};
