import React from 'react';
import styles from './Contact.module.css';
import Footer from '../Components/Footer/index';
const Contact = () => {
  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>Contactanos</h1>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h2 className={styles.name}>Matias Esteves</h2>
          <p className={styles.email}>Matiasxesteves@gmail.com</p>
          <p className={styles.phone}>+123 456 7890</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.name}>Franco Ragusa</h2>
          <p className={styles.email}>FrancoRagusa@gmail.com</p>
          <p className={styles.phone}>+098 765 4321</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.name}>Mateo Cottet</h2>
          <p className={styles.email}>Cottet@gmail.com</p>
          <p className={styles.phone}>+012 345 4321</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;
