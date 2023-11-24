import * as React from 'react';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Button = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  background: 'var(--primary-color)',
  borderRadius: 'var(--border-radius-md)',
  '&:hover': {
    background: 'var(--primary-color)',
    borderColor: 'var(--primary-color)',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'var(--primary-color)',
    borderColor: 'var(--primary-color)',
  },
  '&.MuiButton-outline': {
    background: 'transparent',
    color: 'var(--text-primary-color)',
    borderRadius: 'var(--border-radius-md)',
    border: 'var(--primary-color) solid 1px'
  },
  '&.Mui-disabled': {
    background: 'var(--primary-color)',
    color: 'var(--text-secondary-color)',
    filter: 'brightness(0.6)'
  },
  '&.MuiButton-outline.Mui-disabled': {
    background: 'transparent',
    color: 'var(--text-primary-color)',
    borderRadius: 'var(--border-radius-md)',
    border: 'var(--primary-color) solid 1px'
  },
}));

export default Button;