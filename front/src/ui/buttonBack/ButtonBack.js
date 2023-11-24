import React from 'react';
import Tappable from "../tappable/Tappable";
import {Grid} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

const ButtonBack = ({ onClick }) => {
  return (
    <Tappable onClick={onClick}>
      <Grid
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'48px'}
        width={'48px'}
        borderRadius={'var(--border-radius-lg)'}
        backgroundColor={'var(--bg-color)'}
        border={'var(--element-border)'}
      >
        <ArrowBack sx={{ color: 'var(--hint-color)' }} />
      </Grid>
    </Tappable>
  );
};

export default ButtonBack;