import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";

export const Alert = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.duration ?? 6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        onClose={handleClose}
        variant="filled"
        severity={props.severity ?? "warning"}
      >
        {props.children ?? "Failed."}
      </MuiAlert>
    </Snackbar>
  );
};