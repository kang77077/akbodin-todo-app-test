import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import { Login } from "../components/authentication/Login"
import { List } from "../components/list/List"

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact={true} path="/login" component={Login}/>
        <PrivateRoute exact={true} path="/" component={List} />
      </Switch>
    </BrowserRouter>
  )
}