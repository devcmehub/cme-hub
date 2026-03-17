// src/components/Footer.tsx
import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <small>CME Hub &copy;{currentYear} ALL RIGHTS RESERVED</small>
    </footer>
  );
};

export default Footer;
