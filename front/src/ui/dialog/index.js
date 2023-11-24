import {styled} from "@mui/material/styles";
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogContentText from '@mui/material/DialogContentText';
import MuiDialogTitle from '@mui/material/DialogTitle';

export const Dialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    alignItems: 'start'
  },
  '& .MuiDialog-container > .MuiPaper-root': {
    borderRadius: 'var(--border-radius-md)',
    background: 'var(--bg-color)',
    border: 'var(--element-border)',
    width: '600px'
  }
}));
export const DialogActions = styled(MuiDialogActions)(({ theme }) => ({}));
export const DialogContent = styled(MuiDialogContent)(({ theme }) => ({}));
export const DialogContentText = styled(MuiDialogContentText)(({ theme }) => ({
  color: 'var(--hint-color)'
}));
export const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  color: 'var(--text-secondary-color)'
}));