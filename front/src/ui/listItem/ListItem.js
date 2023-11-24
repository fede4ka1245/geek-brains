import React from 'react';
import styles from './ListItem.module.css';
import {Grid, Typography} from "@mui/material";

const ListItem = ({ image, text, endListContent, noPhoto }) => {
  return (
    <div className={styles.main}>
      {image && !noPhoto && <Grid width={'42px'} height={'42px'}>
        <img src={image} alt={'list-image'} className={styles.image} />
      </Grid>}
      {!image && !noPhoto && <Grid width={'42px'} height={'42px'} bgcolor={'var(--hint-color)'} borderRadius={'var(--border-radius-sm)'}/>}
      <Grid flex={1} ml={'var(--space-sm)'}>
        <Typography
          fontSize={'var(--font-size-sm)'}
          lineHeight={'var(--font-size-sm)'}
          sx={{
            '-webkit-line-clamp': 1,
            overflow: 'hidden',
            maxHeight: 'calc(var(--font-size-sm) * 1)',
            textOverflow: 'ellipsis'
          }}
          color={'var(--hint-color)'}
          fontWeight={'bold'}
        >
          {text}
        </Typography>
      </Grid>
      <Grid height={'42px'}>
        {endListContent}
      </Grid>
    </div>
  );
};

export default ListItem;