import React from 'react';
import {Grid, Typography} from "@mui/material";
import Preloader from "../../ui/preloader/Preloader";

const PreloadContentPlacement = ({ header, isLoading, children }) => {
  return (
    <>
      <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <Typography
          fontWeight={'1000'}
          fontSize={'28px'}
          userSelect={'none'}
          fontFamily={'Nunito'}
          color={'white'}
        >
          {header}
        </Typography>
      </Grid>
      {isLoading && <Grid mt={'var(--space-md)'}>
        <Preloader />
      </Grid>}
      {!isLoading && children}
    </>
  );
};

export default PreloadContentPlacement;