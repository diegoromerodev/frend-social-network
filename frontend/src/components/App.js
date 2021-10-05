import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import GlobalStyles from "./utilities/GlobalStyles";
import { BigContainer } from "./utilities/SpaceContainers";
import Login from "./Login";
import ProtectedRoutes from "./ProtectedRoutes";
import { saveSession } from "./slices/sessionSlice";
import Loading from "./popups/Loading";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const session = localStorage.getItem("frends_session");
    if (session) dispatch(saveSession(JSON.parse(session)));
  }, []);
  return (
    <BigContainer>
      <Loading />
      <HashRouter>
        <GlobalStyles />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <ProtectedRoutes />
          </Route>
        </Switch>
      </HashRouter>
    </BigContainer>
  );
};
