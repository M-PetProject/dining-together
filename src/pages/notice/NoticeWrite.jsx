import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { alertDialogOpenState, alertDialogState, headerState, teamMemberState } from '../../atoms/atom.ts';
import { Box, Button, Container, DialogContentText, FormLabel, Stack, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { getHelperText } from '../../util/validate.js';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FixedBottom from '../../components/FixedBottom.jsx';
import { axiosModule } from '../../api/axios.js';
import { handleError } from '../../api/cm_callsvc.js';
import { isEmptyObj } from '../../util/cm_util.js';
import { useNoticeDetailQuery } from '../../api/useQuerys.js';

export default function NoticeWrite() {
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
      title: '',
      content: '',
      noticeDtStart: '',
      noticeDtEnd: '',
    },
  });

  useEffect(() => {
    if (svc.noticeQuery.isSuccess) {
      const { content, title, noticeDtStart, noticeDtEnd } = svc.noticeQuery.data.data;
      setValue('title', title);
      setValue('content', content);
      setValue('noticeDtStart', dayjs(noticeDtStart));
      setValue('noticeDtEnd', dayjs(noticeDtEnd));
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box component={'form'}>
        <Stack spacing={3}>
          <div>
            <FormLabel component="legend" required>
              제목
            </FormLabel>
            <TextField
              required
              fullWidth
              placeholder="제목을 입력해주세요."
              type="text"
              autoFocus
              {...register('title', { required: true })}
              error={errors.title ? true : false}
              helperText={getHelperText(errors.title?.type)}
            />
          </div>
          <div>
            <FormLabel component="legend" required>
              내용
            </FormLabel>
            <TextField
              required
              fullWidth
              placeholder="내용을 입력해주세요.(100자 이내)"
              type="text"
              multiline
              rows={10}
              {...register('content', { required: true, maxLength: 100 })}
              error={errors.content ? true : false}
              helperText={getHelperText(errors.content?.type)}
            />
          </div>
          <div>
            <FormLabel component="legend" required>
              등록기간
            </FormLabel>
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="noticeDtStart"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <DatePicker
                      value={value}
                      format={'YYYY-MM-DD'}
                      onChange={(newValue) => setValue('noticeDtStart', newValue)}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="noticeDtEnd"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <DatePicker
                      value={value}
                      format={'YYYY-MM-DD'}
                      onChange={(newValue) => setValue('noticeDtEnd', newValue)}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </div>
        </Stack>
        <FixedBottom>
          <Stack direction={'row'} spacing={2}>
            <Button variant={'outlined'} fullWidth onClick={svc.onCancel}>
              취소
            </Button>
            <Button variant={'contained'} fullWidth onClick={handleSubmit(svc.onSave)}>
              저장
            </Button>
          </Stack>
        </FixedBottom>
      </Box>
    </Container>
  );
}

const useService = () => {
  const navi = useNavigate();
  const setHeaderState = useSetRecoilState(headerState);
  const setOpenAlert = useSetRecoilState(alertDialogOpenState);
  const setAlertDialog = useSetRecoilState(alertDialogState);
  const teamInfoState = useRecoilValue(teamMemberState);

  const { idx: noticeIdx } = useParams();
  const [isModifyMode, setIsModifyMode] = useState(!!noticeIdx);

  useEffect(() => {
    setHeaderState({
      left: {
        header: (
          <Button onClick={onCancel}>
            <ChevronLeftIcon />
            <p>공지{trans('등록', isModifyMode)}</p>
          </Button>
        ),
      },
    });
  }, []);

  function onCancel() {
    setAlertDialog({
      title: '',
      content: <DialogContentText>공지{trans('등록', isModifyMode)}을 취소하시겠습니까?</DialogContentText>,
      succFn: () => {
        let url = `/`;
        if (noticeIdx) {
          url = `/notice/${noticeIdx}`;
        }
        navi(url);
      },
    });
    setOpenAlert(true);
  }

  function onSave(data) {
    setAlertDialog({
      title: '',
      content: <DialogContentText>공지를 {trans('등록', isModifyMode)}하시겠습니까?</DialogContentText>,
      succFn: () => {
        save(data);
      },
    });
    setOpenAlert(true);

    function save(data) {
      let noticeDtStart = dayjs(data.noticeDtStart).format('YYYYMMDDHHmmss');
      if (isEmptyObj(noticeDtStart)) {
        noticeDtStart = dayjs(new Date()).format('YYYYMMDDHHmmss');
      }
      let noticeDtEnd = dayjs(data.noticeDtEnd).format('YYYYMMDDHHmmss');
      if (isEmptyObj(noticeDtEnd)) {
        noticeDtEnd = '20991231000000';
      }

      let prmMap = {
        ...data,
        noticeDtStart,
        noticeDtEnd,
        useYn: 'Y',
      };

      if (isModifyMode) {
        axiosModule
          .put(`notice/${teamInfoState.teamIdx}/${noticeIdx}`, prmMap)
          .then((res) => {
            alert(res.data);
            navi(`/notice/${noticeIdx}`);
          })
          .catch(handleError);
      } else {
        axiosModule
          .post(`notice/${teamInfoState.teamIdx}`, prmMap)
          .then((res) => {
            alert(res.data);
            navi(`/notice/${noticeIdx}`);
          })
          .catch(handleError);
      }
    }
  }

  const noticeQuery = useNoticeDetailQuery(teamInfoState.teamIdx, noticeIdx, {
    enabled: isModifyMode,
    staleTime: Infinity,
  });

  return {
    onCancel,
    onSave,
    noticeQuery,
    isModifyMode,
  };
};

const trans = (str, isModifyMode) => {
  if (isModifyMode) {
    switch (str) {
      case '등록':
        return '수정';
    }
  }

  return str;
};
