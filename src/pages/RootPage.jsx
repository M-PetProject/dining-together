import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../atoms/atom';
import { useAuth } from '../util/hooks';

const RootPage = () => {
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
  const { isLogin } = useAuth();
  // console.log(isLogin);
};

export default RootPage;
