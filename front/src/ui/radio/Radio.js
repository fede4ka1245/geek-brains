import * as React from 'react';
import MuiRadio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

const Radio = styled(MuiRadio)(({ theme }) => ({
  '&.MuiRadio-root': {
    color: 'var(--hint-color)'
  },

  '&.MuiRadio-root.Mui-checked': {
    color: 'var(--primary-color)'
  }
}));

export default Radio;