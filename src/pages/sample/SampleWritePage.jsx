import React from 'react';
import { BackButton } from '../../components/Buttons.jsx';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import Gap from '../../components/Gap.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInputs } from '../../util/hooks.jsx';
import { api } from '../../api/cm_callsvc.js';
import { useMutation } from 'react-query';
import { cm_util } from '../../util/cm_util.js';
import { axiosModule } from '../../api/axios.js';
import { SaveType } from '../../enum/enum.ts';

const SampleWritePage = () => {
  const { _onSave, _onCancel, postMutate, defaultMap } = useService();

  const [form, onChange, reset] = useInputs(defaultMap);
  const { idx, test1, test2 } = form;

  return (
    <Container>
      <BackButton />
      <hr />

      <Gap width={10} height={10} />

      <Card elevation={8}>
        <CardHeader title="게시판 ID" subheader={`#${idx}`} />

        <CardContent>
          <TextField
            id="title"
            label="게시판 제목"
            helperText=""
            variant="standard"
            fullWidth={true}
            /* name => key 값이 됩니다.*/
            name="test1"
            value={test1}
            onChange={onChange}
          />
          <Gap height={20} />
          <TextField
            id="contents"
            label="내용"
            helperText=""
            variant="standard"
            fullWidth={true}
            multiline={true}
            rows={4}
            /* name => key 값이 됩니다.*/
            name="test2"
            value={test2}
            onChange={onChange}
          />
        </CardContent>

        <CardActions>
          <Button size="small" onClick={() => _onSave(form)} variant={'contained'}>
            저장
          </Button>
          <Button size="small" onClick={_onCancel}>
            취소
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

const useService = () => {
  const navi = useNavigate();

  // 이전 페이지에서 parameter 를 전달받기 위함
  const location = useLocation();

  let defaultMap = cm_util.nvl(location.state, {
    idx: '',
    test1: '',
    test2: '',
  });
  const saveType = cm_util.isEmptyObj(location.state) ? SaveType.POST : SaveType.PUT;

  /* POST data */
  //** mutate() 함수 호출 시 실행될, 함수 정의 **//
  // 바로 실행되는 메소드가 아닙니다.
  const postMutation = useMutation(async (form) => {
    return await axiosModule.post('/comm/test', form).then((res) => {
      if (res.status === 200) {
        alert('게시글 저장되었습니다.');
        navi('/sample/list');
      }
    });
  });

  const putMutation = useMutation(async (form) => {
    return await axiosModule.put('/comm/test', form).then((res) => {
      if (res.status === 200) {
        alert('게시글 수정되었습니다.');
        navi('/sample/' + form.idx);
      }
    });
  });

  const _onCancel = () => {
    navi(-1);
  };

  const _onSave = (form) => {
    //** POST API 실제 호출 **//
    if (saveType === SaveType.POST) {
      postMutation.mutate(form);
    }

    if (saveType === SaveType.PUT) {
      putMutation.mutate(form);
    }
  };

  return {
    defaultMap,
    _onCancel,
    _onSave,
    postMutate: postMutation,
  };
};

export default SampleWritePage;
