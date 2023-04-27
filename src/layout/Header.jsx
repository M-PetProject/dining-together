import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import viteLogo from '/vite.svg';
import { AppBar, Box, Button, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState } from 'recoil';
import { headerState } from '../atoms/atom';

export default function Header() {
  const svc = useService();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: '55px' }} color="transparent">
        <Toolbar>
          {svc.header === null ? (
            <>
              {svc.topIcon}
              <Typography variant="h7" component="div" sx={{ flexGrow: 1 }} onClick={svc._toMain}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={viteLogo} className="logo" alt="logo" />
                  밥먹장
                </div>
              </Typography>
            </>
          ) : (
            <Grid container direction="row" alignItems="center">
              <Grid item xs={9}>
                <Stack alignItems="flex-start">
                  {svc.header.left.header}
                  <small style={{ fontSize: 2, marginLeft: 30 }}>{svc.header.left.subHeader}</small>
                </Stack>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                {svc.header.right}
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const useService = () => {
  const navi = useNavigate();
  const location = useLocation();
  const [topIcon, setTopIcon] = useState(null);
  const [header, setHeaderState] = useRecoilState(headerState);

  const _toMain = () => navi('/');

  useEffect(() => {
    switch (location.pathname) {
      case '/sign-up':
        setTopIcon(
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navi(-1)}
          >
            <CloseIcon />
          </IconButton>
        );
        break;
      default:
        setTopIcon(null);
    }
  }, [location.pathname]);

  return {
    _toMain,
    topIcon,
    header,
  };
};
