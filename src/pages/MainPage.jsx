import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../atoms/atom';
import { useAuth } from '../util/hooks';
import { axiosModule } from '../api/axios';
import { isEmptyObj } from '../util/cm_util';

const MainPage = () => {
  const svc = useService();
  return (
    <div>
      Hello, It's Main Page
      <div>
        <Link to="second">To SecondPage</Link>
      </div>
      <div>
        <Link to="/sample/list">To SamplePage</Link>
      </div>
    </div>
  );
};

const useService = () => {
  const navi = useNavigate();
  const { user, isLogin } = useAuth();

  useEffect(() => {
    /// 소속 팀 정보 확인
    axiosModule.get(`/member`).then((res) => {
      console.log(res);
      const { teamMemberVos } = res.data;
      if (isEmptyObj(teamMemberVos)) {
        navi('/team/select');
      }
    });
  }, []);
};

export default MainPage;
