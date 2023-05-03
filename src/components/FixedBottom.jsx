import { Container, Paper } from '@mui/material';
import React from 'react';

const FixedBottom = (props) => {
  return (
    <Paper sx={{ position: 'fixed', bottom: 20, left: 0, right: 0 }} elevation={0}>
      <Container maxWidth="xs">{props.children}</Container>
    </Paper>
  );
};

export default FixedBottom;
