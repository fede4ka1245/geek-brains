import * as React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const Checkbox = styled(MuiCheckbox)(({ theme }) => ({
  '&.MuiCheckbox-root': {
    color: 'var(--hint-color)'
  },

  '&.MuiCheckbox-root.Mui-checked': {
    color: 'var(--primary-color)'
  }
}));

export default Checkbox;