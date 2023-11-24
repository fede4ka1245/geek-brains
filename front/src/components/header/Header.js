import React from 'react';
import {Grid, Typography} from "@mui/material";

const Header = () => {
  return (
    <Grid
      position={'sticky'}
      display={'flex'}
      alignItems={'center'}
      width={'100%'}
      top={0}
      left={0}
      height={'var(--header-height)'}
      style={{ backgroundColor: 'var(--bg-color)', userSelect: 'none', zIndex: 100 }}
      borderBottom={'var(--element-border)'}
      justifyContent={'center'}
    >
      <Grid
        maxWidth={'100%'}
        width={'var(--content-width)'}
        pl={'var(--space-md)'}
        pr={'var(--space-md)'}
      >
        <Typography
          fontWeight={'1000'}
          fontSize={'28px'}
          userSelect={'none'}
          fontFamily={'Nunito'}
          color={'white'}
        >
          GeekBrains x Бобы
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;