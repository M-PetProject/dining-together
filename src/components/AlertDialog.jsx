import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useRecoilState } from 'recoil';
import { alertDialogOpenState, alertDialogState } from '../atoms/atom';
import { isEmptyObj } from '../util/cm_util';

export default function AlertDialog(props) {
  const [open, setOpen] = useRecoilState(alertDialogOpenState);
  const [state, setState] = useRecoilState(alertDialogState);
  const { title = '제목', content = '내용', succFn = null } = state;

  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    succFn();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
          {isEmptyObj(succFn) ? (
            ''
          ) : (
            <Button onClick={handleConfirm} autoFocus>
              확인
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
