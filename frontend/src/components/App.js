import React, { useEffect } from "react";
import io from "socket.io-client";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GlobalStyles from "./utilities/GlobalStyles";
import { BigContainer } from "./utilities/SpaceContainers";
import Login from "./Login";
import ProtectedRoutes from "./ProtectedRoutes";
import { saveSession } from "./slices/sessionSlice";
import Loading from "./popups/Loading";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      socket.emit("enter", "tempUserID");
    });
    socket.on("message", (messageObj) => {
      console.log("received");
      setMessages((prevState) => [messageObj, ...prevState]);
    });
    socket.on("notification", (notiObj) => {
      setNotifications((prevState) => [notiObj, ...prevState]);
    });
    return () => socket.disconnect();
  });
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
