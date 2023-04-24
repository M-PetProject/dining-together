import { Alert, Collapse, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useRecoilValue } from 'recoil';
import { alertToastOpenState, alertToastState } from '../atoms/atom';
import toastStyle from '/src/styles/module/Toast.module.scss';

const AlertToast = () => {
  const [open, setOpen] = useRecoilState(alertToastOpenState);
  const msg = useRecoilValue(alertToastState);

  useEffect(() => {
    autoClose();
  }, [open]);

  function autoClose(seconds = 3) {
    if (!open) return;
    setTimeout(() => {
      setOpen(false);
      console.log('setOpen(false);');
    }, seconds * 1000);
  }

  return (
    <div className={toastStyle.toast}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
    </div>
  );
};

export default AlertToast;
