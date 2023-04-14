import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BackButton } from '../../components/Buttons.jsx';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/cm_callsvc.js';
import { useQuery } from 'react-query';
import Gap from '../../components/Gap.jsx';

const SamplePage = () => {
  const svc = useService();

  if (svc.getDataListQuery.isLoading) return <div />;
  const apiData = svc.getDataListQuery.data;
  return (
    <Container>
      <BackButton />
      <hr />
      <Button variant="contained" onClick={svc._onClickPost}>
        글쓰기
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>idx</TableCell>
              <TableCell>idx</TableCell>
              <TableCell align="right">test1</TableCell>
              <TableCell align="right">test2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.data.map((row) => {
              const { idx, test1, test2 } = row;
              return (
                <TableRow key={idx} onClick={() => svc._onClickRow(idx)} hover={true} style={{ cursor: 'pointer' }}>
                  <TableCell component="th" scope="row">
                    {' '}
                    {idx}{' '}
                  </TableCell>
                  <TableCell align="right">{test1}</TableCell>
                  <TableCell align="right">{test2}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Gap height={10} />
      <Pagination
        count={apiData.endPage}
        variant="outlined"
        color="primary"
        shape="rounded"
        page={svc.pageNo}
        onChange={svc._onPagination}
      />
    </Container>
  );
};

const useService = () => {
  /// 페이지 이동 hooks
  const navi = useNavigate();

  const [pageNo, setPageNo] = useState(1);

  /* API 호출 방법 1 */
  /// 마지막 arguments에 설정된 state가 변할때마다 실행되는 hook 함수
  // (* 마지막 arguments가 빈배열[] 일 경우, 최초 1회만 실행함)
  useEffect(() => {
    return;
    api.get(
      '/comm/tests',
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  /* API 호출 방법 2 */
  const getDataListQuery = useQuery(['posts', pageNo], async () => {
    return await api.getSuccess(`/comm/tests?pageNo=${pageNo}`);
  });

  const _onClickPost = () => navi('/sample/write');

  const _onClickRow = (idx) => {
    navi('/sample/' + idx);
  };

  const _onPagination = (event, value) => {
    setPageNo(value);
  };

  return {
    getDataListQuery,
    pageNo,
    setPageNo,
    _onClickPost,
    _onClickRow,
    _onPagination,
  };
};

export default SamplePage;
