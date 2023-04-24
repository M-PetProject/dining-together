import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertDialog from '../../components/AlertDialog';
import { useRecoilState } from 'recoil';
import { alertDialogOpenState } from '../../atoms/atom';

const SelectTeamPage = () => {
  const [open, setOpen] = useRecoilState(alertDialogOpenState);

  return (
    <div>
      SelectTeamPage
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open alert dialog
      </Button>
      <AlertDialog title="제목" content="내용" succFn={() => console.log('hi!')} />
    </div>
  );
};

export default SelectTeamPage;
