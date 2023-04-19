import React from 'react';
import styles from '/src/styles/module/Header.module.scss';
import { Link } from 'react-router-dom';
import viteLogo from '/vite.svg';

const Header = () => {
  const svc = useService();
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={viteLogo} className="logo" alt="logo" />

          <h4>회식 정하기</h4>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to="/sign-in">로그인</Link>
            </li>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/sample/list">샘플 페이지</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const useService = () => {};

export default Header;
