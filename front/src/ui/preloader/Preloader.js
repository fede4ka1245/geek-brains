import React from 'react';
import styles from './Preloader.module.css';
import classNames from "classnames";

const Preloader = () => {
  return (
    <div className={classNames(styles.main)}>
      <div className={classNames(styles.item1, styles.skeleton)} />
      <div className={classNames(styles.item2, styles.skeleton)} />
      <div className={classNames(styles.item3, styles.skeleton)} />
    </div>
  );
};

export default Preloader;