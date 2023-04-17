import React from 'react';
import styles from '/src/styles/module/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <h2 className={styles.title}>## Footer ##</h2>
      </div>
    </footer>
  );
};

export default Footer;
