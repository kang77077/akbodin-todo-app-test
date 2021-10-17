import React from "react";
import { Alert } from "./Alert";

export const AlertWarning = (props) => {
  return (
    <Alert {...props} severity="warning">
      {props.children ?? "Failed."}
    </Alert>
  )
};