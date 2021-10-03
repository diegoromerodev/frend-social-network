import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RegularButton, RoundedInputButton } from "./utilities/FormElements";
import { CircleContainer, FlexContainer } from "./utilities/SpaceContainers";
import { ImageForContainer, Separator } from "./utilities/Misc";
import Post from "./Post";
import Chatroom from "./Chatroom";
import FriendRequests from "./FriendRequests";
import Loading from "./popups/Loading";
import Search from "./popups/Search";
import NewPost from "./popups/NewPost";
import Notifications from "./popups/Notifications";
import ProfileHeader from "./utilities/ProfileHeader";
import EditProfile from "./popups/EditProfile";
import GeneralOptions from "./popups/GeneralOptions";
import NavBar from "./NavBar";
import { PostWrapper } from "./utilities/postElements";

export default () => {
  const session = useSelector((state) => state.session.value);
  return (
    <>
      {!session && <Redirect to="login" />}
      <NavBar />
      <PostWrapper style={{ marginTop: "5rem" }}>
        <FlexContainer>
          <CircleContainer>
            <ImageForContainer src="https://i.pinimg.com/564x/ed/02/62/ed02622c207a5b4b4d9acb065b44b55f.jpg" />
          </CircleContainer>
          <RoundedInputButton>
            What&apos;s on your mind, Diego?
          </RoundedInputButton>
        </FlexContainer>
        <Separator />
        <FlexContainer>
          <RegularButton className="blue">Send Post</RegularButton>
          <RegularButton>Cancel Post</RegularButton>
          <RegularButton className="transparent">Add Image</RegularButton>
        </FlexContainer>
      </PostWrapper>
      <Post
        post={{
          heading: "crazy 😲😲",
          comments: [],
          text: "Today was pretty, cooooooooooool. Thought I should let y'all know :) If y'all need anything else, lmk brb",
        }}
      />
      <Chatroom />
      <FriendRequests />
      <Loading />
      <Search />
      <NewPost type="post" />
      <NewPost type="comment" />
      <Notifications />
      <ProfileHeader />
      <EditProfile />
      <GeneralOptions />
    </>
  );
};
