import React from 'react';
import styles from '/src/styles/module/Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import viteLogo from '/vite.svg';
import { useAuth } from '../util/hooks';

const Header = () => {
  const svc = useService();

  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <Link to="/">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={viteLogo} className="logo" alt="logo" />

            <h4>회식 정하기</h4>
          </div>
        </Link>
        <nav className={styles.navigation}>
          <ul>
            <li>{svc.isLogin ? <Link onClick={svc._onSignout}>로그아웃</Link> : <Link to="/sign-in">로그인</Link>}</li>
            {/* <li>
              <Link to="/">홈</Link>
            </li> */}
            <li>
              <Link to="/sample/list">샘플 페이지</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const useService = () => {
  const navi = useNavigate();
  const { isLogin, signOut } = useAuth();
  const _onSignout = () => {
    signOut();
    navi('/');
  };

  return {
    isLogin,
    _onSignout,
  };
};

export default Header;
