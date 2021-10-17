import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = (props) => {
  if (localStorage.getItem("token")) {
    return <Redirect to="/"/>
  }

  return <Route {...props}/>
}