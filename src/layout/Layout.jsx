import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from '/src/styles/module/Layout.module.scss';
import AlertDialog from '../components/AlertDialog.jsx';
import AlertToast from '../components/AlertToast.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/fallback/ErrorFallback';
import { Fab } from '@mui/material';
import useSignOut from '../hooks/useSignOut';
import { useAuth } from '../util/hooks.jsx';
import DevContainer from '../components/DevContainer';

const Layout = ({ children }) => {
  const handleSignOut = useSignOut();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={styles.layout}>
        <Header />

        <main className={styles.main}>{children}</main>

        {/* 공통 */}
        <AlertToast />
        <AlertDialog />

        <DevContainer>
          <div style={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', flexDirection: 'column' }}>
            <Fab color="primary" aria-label="sign-out" onClick={() => handleSignOut()}>
              로그아웃
            </Fab>
          </div>
        </DevContainer>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
