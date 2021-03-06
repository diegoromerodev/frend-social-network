import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Chatroom from "./Chatroom";
import FriendRequests from "./FriendRequests";
import Search from "./search/Search";
import Notifications from "./popups/Notifications";
import ProfileHeader from "./utilities/ProfileHeader";
import NavBar from "./NavBar";
import Feed from "./Feed";
import Forms from "./forms/Forms";
import HandleRealTime from "./utilities/HandleRealTime";
import UserProfile from "./UserProfile";
import SinglePost from "./SinglePost";

export default () => {
  const session = useSelector((state) => state.session.value);
  const [reloadFeed, setReloadFeed] = useState(Date.now());
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  return (
    <>
      {!session && <Redirect to="/login" />}
      <HandleRealTime
        setUnreadNotifications={setUnreadNotifications}
        session={session}
      />
      {session.user && (
        <>
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
          <Route path="/users/:userId">
            <UserProfile />
          </Route>
          <Route path="/posts/:postId">
            <SinglePost />
          </Route>
        </>
      )}
    </>
  );
};
