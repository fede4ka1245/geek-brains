import * as React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Input = styled(TextField)(({ theme }) => ({
  '& > .MuiInputBase-root': {
    color: 'var(--text-secondary-color) !important',
    borderRadius: 'var(--border-radius-sm) !important',
  },

  '& > .MuiInputLabel-root': {
    color: 'var(--text-primary-color) !important',
  },

  '& > .MuiInputBase-root > .Mui-disabled': {
    opacity: 0.5,
    '-webkit-text-fill-color': 'var(--text-secondary-color) !important',
  },

  '& > .Mui-focused > .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--text-primary-color) !important',
  },

  '& > .MuiInputBase-root > .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--text-primary-color) !important',
  }
}));

export default Input;