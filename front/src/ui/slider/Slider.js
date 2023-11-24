import * as React from 'react';
import MuiSlider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const Slider = styled(MuiSlider)(({ theme }) => ({
  color: 'var(--primary-color)',
  paddingTop: '10px !important',
  paddingBottom: '10px !important',
  marginBottom: '-10px !important'
}));

export default Slider;