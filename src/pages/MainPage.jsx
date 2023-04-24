import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../atoms/atom';
import { useAuth } from '../util/hooks';
import { axiosModule } from '../api/axios';

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
  const { user, isLogin } = useAuth();

  useEffect(() => {
    /// 팀 정보 확인
    // console.log(user);
    axiosModule.get(`/member/${user.memberId}`).then((res) => {
      console.log(res);
    });
  }, []);
};

export default MainPage;
