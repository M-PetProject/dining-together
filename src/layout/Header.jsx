import React, { useEffect, useState } from 'react';
import styles from '/src/styles/module/Header.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import viteLogo from '/vite.svg';
import { useAuth } from '../util/hooks';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

export default function Header() {
  const svc = useService();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {svc.topIcon}
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }} onClick={svc._toMain}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={viteLogo} className="logo" alt="logo" />
              밥먹장
            </div>
          </Typography>
          {svc.isLogin ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="sign-out"
              sx={{ mr: 2 }}
              onClick={svc._onSignout}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="sign-in"
              sx={{ mr: 2 }}
              onClick={svc._toSignIn}
            >
              <LoginIcon />
            </IconButton>
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

  const { isLogin, signOut } = useAuth();

  const _onSignout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      signOut();
      navi('/');
    }
  };

  const _toSignIn = () => navi('/sign-in');

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
    isLogin,
    _onSignout,
    _toSignIn,
    _toMain,
    topIcon,
  };
};
