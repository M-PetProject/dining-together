import { Alert, Button, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertDialog from '../../components/AlertDialog';
import { useRecoilState } from 'recoil';
import { alertDialogOpenState, alertToastOpenState, alertToastState } from '../../atoms/atom';

const SelectTeamPage = () => {
  const [open, setOpen] = useRecoilState(alertDialogOpenState);

  const [msg, setMsg] = useRecoilState(alertToastState);
  const [openToast, setOpenToast] = useRecoilState(alertToastOpenState);

  useEffect(() => {
    // setMsg('fdsjkfl');
  }, []);

  return (
    <div>
      SelectTeamPage
      <Button variant="outlined" onClick={() => setOpenToast(true)}>
        Open alert dialog
      </Button>
      {/* <AlertDialog title="제2목" content="내2용" succFn={() => console.log('hi!')} /> */}
    </div>
  );
};

export default SelectTeamPage;
