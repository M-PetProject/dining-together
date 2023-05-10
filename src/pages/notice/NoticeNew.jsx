import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { alertDialogOpenState, alertDialogState, headerState, teamMemberState } from '../../atoms/atom.js';
import { Box, Button, Container, DialogContentText, FormLabel, Stack, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft.js';
import { useNavigate } from 'react-router-dom';
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

export default function NoticeNew() {
  const svc = useService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      noticeDtStart: '',
      noticeDtEnd: '',
    },
  });

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
                <DatePicker
                  format={'YYYY-MM-DD'}
                  onChange={(newValue) => setValue('noticeDtStart', dayjs(newValue).format('YYYYMMDDHHmmss'))}
                />
                <DatePicker
                  format={'YYYY-MM-DD'}
                  onChange={(newValue) => setValue('noticeDtEnd', dayjs(newValue).format('YYYYMMDDHHmmss'))}
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

  useEffect(() => {
    setHeaderState({
      left: {
        header: (
          <Button onClick={onCancel}>
            <ChevronLeftIcon />
            <p>공지등록</p>
          </Button>
        ),
      },
    });
  }, []);

  function onCancel() {}

  function onSave(data) {
    setAlertDialog({
      title: '',
      content: <DialogContentText>공지를 등록하시겠습니까?</DialogContentText>,
      succFn: () => {
        save(data);
      },
    });
    setOpenAlert(true);

    function save(data) {
      let url = `notice/${teamInfoState.teamIdx}`;

      let noticeDtStart = data.noticeDtStart;
      if (isEmptyObj(noticeDtStart)) {
        noticeDtStart = dayjs(new Date()).format('YYYYMMDDHHmmss');
      }
      let noticeDtEnd = data.noticeDtEnd;
      if (isEmptyObj(noticeDtEnd)) {
        noticeDtEnd = '99991231000000';
      }

      let prmMap = {
        ...data,
        noticeDtStart,
        noticeDtEnd,
      };

      axiosModule
        .post(url, prmMap)
        .then((res) => {
          alert(res.data);
          navi('/');
        })
        .catch(handleError);
    }
  }

  return {
    onCancel,
    onSave,
  };
};
