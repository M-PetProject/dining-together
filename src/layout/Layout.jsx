import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import styles from '/src/styles/module/Layout.module.scss';
import AlertDialog from '../components/AlertDialog.jsx';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
