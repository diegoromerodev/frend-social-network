import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Chatroom from "./Chatroom";
import FriendRequests from "./FriendRequests";
import Search from "./search/Search";
import Notifications from "./popups/Notifications";
import ProfileHeader from "./utilities/ProfileHeader";
import EditProfile from "./popups/EditProfile";
import NavBar from "./NavBar";
import Feed from "./Feed";
import Forms from "./forms/Forms";
import HandleRealTime from "./utilities/HandleRealTime";

export default () => {
  const session = useSelector((state) => state.session.value);
  const [reloadFeed, setReloadFeed] = useState(Date.now());
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  return (
    <>
      {!session && <Redirect to="login" />}
      {session && (
        <HandleRealTime setUnreadNotifications={setUnreadNotifications} />
      )}
      <NavBar unreadNotifications={unreadNotifications} />
      <Forms setReloadFeed={setReloadFeed} />
      <Route path="/" exact>
        <Feed reloadFeed={reloadFeed} setReloadFeed={setReloadFeed} />
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
    </>
  );
};
