import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Chatroom from "./Chatroom";
import FriendRequests from "./FriendRequests";
import Search from "./popups/Search";
import Notifications from "./popups/Notifications";
import ProfileHeader from "./utilities/ProfileHeader";
import EditProfile from "./popups/EditProfile";
import GeneralOptions from "./popups/GeneralOptions";
import NavBar from "./NavBar";
import Feed from "./Feed";
import Forms from "./forms/Forms";

export default () => {
  const session = useSelector((state) => state.session.value);
  const [reloadFeed, setReloadFeed] = useState(Date.now());
  return (
    <>
      {!session && <Redirect to="login" />}
      <NavBar />
      <Forms setReloadFeed={setReloadFeed} />
      <Route path="/" exact>
        <Feed reloadFeed={reloadFeed} />
      </Route>
      <Route path="/chatrooms">
        <Chatroom />
      </Route>
      <Route path="/requests">
        <FriendRequests />
      </Route>
      <Route path="/notifications">
        <Notifications />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <ProfileHeader />
      <EditProfile />
      <GeneralOptions />
    </>
  );
};
