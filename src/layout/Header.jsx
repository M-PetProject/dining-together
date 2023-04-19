import React from 'react';
import styles from '/src/styles/module/Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import viteLogo from '/vite.svg';
import { useAuth } from '../util/hooks';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const svc = useService();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }} onClick={svc._toMain}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={viteLogo} className="logo" alt="logo" />
              회식정하기
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
};

const useService = () => {
  const navi = useNavigate();
  const { isLogin, signOut } = useAuth();

  const _onSignout = () => {
    signOut();
    navi('/');
  };

  const _toSignIn = () => navi('/sign-in');

  const _toMain = () => navi('/');

  return {
    isLogin,
    _onSignout,
    _toSignIn,
    _toMain,
  };
};

export default Header;
