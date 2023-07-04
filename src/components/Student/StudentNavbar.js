import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const StudentNavbar = (props) => {
  
  
  
  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant='h6' component='div'>
              User : {props.email}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      
    </div>
  );
};
export default StudentNavbar;