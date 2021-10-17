import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props) => {
  if (!localStorage.getItem("token")) {
    return <Redirect to="/login"/>
  }

  return <Route {...props}/>
}