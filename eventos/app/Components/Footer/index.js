import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>TODOS LOS EVENTOS SON EN 2024</p>
        <ul className={styles.links}>
          <li><a href="/" className={styles.link}>Eventos</a></li>
          <li><a href="/Contact" className={styles.link}>Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
