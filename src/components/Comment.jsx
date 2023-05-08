import React, { useEffect } from 'react';
import { useCommentQuery } from '../api/useQuerys';
import { PropTypes } from 'prop-types';
import { useAuth } from '../util/hooks';
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

export default function Comment({ commentType, postIdx, teamIdx, commentList = [] }) {
  const svc = useService({ commentType, postIdx, teamIdx, commentList });

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

  console.log(commentList);
  return (
    <>
      <List sx={{ width: '100%' }}>
        {commentList.map((comment) => {
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
        })}
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
  return {
    onPostComment,
  };
};
