import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function backDrop({ open, handleCloseBackDrop, background=false}) {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: background ? 'rgba(0, 66, 99, 0.1)' : false
      }}
      open={open}
      onClick={handleCloseBackDrop}
    >
      <CircularProgress color="warning"/>
    </Backdrop>
  );
}
