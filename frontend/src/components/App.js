import React, { useEffect } from "react";
import io from "socket.io-client";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalStyles from "./utilities/GlobalStyles";
import { BigContainer } from "./utilities/SpaceContainers";
import Login from "./Login";
import ProtectedRoutes from "./ProtectedRoutes";

export default () => {
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
  return (
    <BigContainer>
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
