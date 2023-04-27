import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from '/src/styles/module/Layout.module.scss';
import AlertDialog from '../components/AlertDialog.jsx';
import AlertToast from '../components/AlertToast.jsx';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Gap from '../components/Gap';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{children}</main>

      {/* 공통 */}
      <AlertToast />
      <AlertDialog />

      {/* 개발용 FAB */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', flexDirection: 'column' }}>
        {/* <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Gap height={10} />
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab> */}
      </div>
    </div>
  );
};

export default Layout;
