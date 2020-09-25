import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import TelBook from "./components/telBook/TelBook";

export const useRouter = (auth) => {
  if (auth) {
    return (
      <Switch>
        <Route exact path="/contacts" component={TelBook} />
        <Redirect to="/contacts" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Redirect to="/login" />
    </Switch>
  );
};
