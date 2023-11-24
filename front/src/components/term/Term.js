import React from 'react';
import {Grid, Typography} from "@mui/material";
import styles from './Term.module.css';

const Term = ({ term }) => {
  return (
    <Grid>
      <div className={styles.term}>
        <strong className={styles.strong}>
          {term.name}
        </strong>
        - {term.definition}
      </div>
      <div className={styles.lowTerm}>
        <strong className={styles.strong}>
          Начало:
        </strong>
        {term.timeStart}
      </div>
      <div className={styles.lowTerm}>
        <strong className={styles.strong}>
          Конец:
        </strong>
        {term.timeEnd}
      </div>
    </Grid>
  );
};

export default Term;