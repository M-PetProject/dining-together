import React, { useEffect } from 'react';
import { Box, Button, Container, FormLabel, Stack, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft.js';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { headerState, userState } from '../../atoms/atom.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getHelperText } from '../../util/validate.js';
import { axiosModule } from '../../api/axios.js';

export default function PlaceWritePage(props) {
  const svc = useService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
      intro: '',
      rating: 0,
      businessHours: '',
      imageUrl: '',
      extUrl: '',
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box component={'form'}>
        <Stack spacing={3}>
          <div>
            <FormLabel component={'legend'} required>
              장소명
            </FormLabel>
            <TextField
              required
              fullWidth
              placeholder={'장소명 입력'}
              type={'text'}
              {...register('name', { required: true })}
              error={!!errors.name}
              helperText={getHelperText(errors.name?.type)}
            />
          </div>
          <div>
            <FormLabel component={'legend'}>소개</FormLabel>
            <TextField
              fullWidth
              placeholder={'소개글 입력'}
              type={'text'}
              multiline={true}
              rows={5}
              {...register('intro')}
              error={!!errors.intro}
              helperText={getHelperText(errors.intro?.type)}
            />
          </div>
          <div>
            <FormLabel component={'legend'} required>
              평점
            </FormLabel>
            <TextField
              required
              fullWidth
              placeholder={'숫자만 입력'}
              type={'number'}
              {...register('rating', { required: true })}
              error={!!errors.rating}
              helperText={getHelperText(errors.rating?.type)}
            />
          </div>
          <div>
            <FormLabel component={'legend'}>영업시간</FormLabel>
            <TextField
              fullWidth
              placeholder={'예) 매일 10:00 ~ 20:00'}
              type={'text'}
              {...register('businessHours')}
              error={!!errors.businessHours}
              helperText={getHelperText(errors.businessHours?.type)}
            />
          </div>
          <div>
            <FormLabel component={'legend'}>사진</FormLabel>
            <TextField
              fullWidth
              placeholder={'image Url'}
              type={'text'}
              {...register('imageUrl', { required: true })}
              error={!!errors.imageUrl}
              helperText={getHelperText(errors.imageUrl?.type)}
            />
          </div>
          <div>
            <FormLabel component={'legend'} required>
              링크 URL
            </FormLabel>
            <TextField
              required
              fullWidth
              type={'text'}
              {...register('extUrl', { required: true })}
              error={!!errors.extUrl}
              helperText={getHelperText(errors.extUrl?.type)}
            />
          </div>

          <Stack direction={'row'} spacing={2}>
            <Button fullWidth color={'inherit'} variant={'contained'} onClick={svc.onCancel}>
              취소
            </Button>
            <Button fullWidth color={'primary'} variant={'contained'} onClick={handleSubmit(svc.onSave)}>
              저장
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

const useService = () => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState(headerState);
  const user = useRecoilValue(userState);

  const renderHeader = () => {
    setHeaderState({
      left: {
        header: (
          <Button onClick={() => navi('/')}>
            <ChevronLeftIcon />
            <p>장소추천등록</p>
          </Button>
        ),
      },
    });
  };

  function onCancel() {
    if (confirm('이전 페이지로 돌아가시겠습니까?')) {
      navi(-1);
    }
  }

  function onSave(data) {
    data['creatorMemberIdx'] = user.memberIdx;
    axiosModule.post('/place', data).then((res) => {
      alert(res.data);
      navi('/');
    });
  }

  useEffect(() => {
    renderHeader();
  }, []);

  return {
    onSave,
    onCancel,
  };
};
