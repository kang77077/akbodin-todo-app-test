import React from "react";
import { Alert } from "./Alert";

export const AlertSuccess = (props) => {
  return (
    <Alert {...props} severity="success">
      {props.children ?? "Successfully."}
    </Alert>
  )
};