import {styled} from "@mui/material/styles";
import MuiDrawer from '@mui/material/Drawer';

export const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'var(--bg-color)',
    borderTop: 'var(--element-border)',
    borderLeft: 'var(--element-border)',
    borderRight: 'var(--element-border)',
    borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0'
  }
}));