import * as React from 'react';
import MuiMenu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';

const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'var(--bg-color)',
    border: 'var(--element-border)',
    borderRadius: 'var(--border-radius-md)'
  }
}));

export default Menu;