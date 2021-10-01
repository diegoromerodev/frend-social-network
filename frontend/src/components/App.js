import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { HashRouter } from "react-router-dom";
import { RegularButton, RoundedInputButton } from "./utilities/FormElements";
import GlobalStyles from "./utilities/GlobalStyles";
import {
  BigContainer,
  CircleContainer,
  FlexContainer,
} from "./utilities/SpaceContainers";
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

export default () => {
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
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
  const handleClick = (res) => {
    console.log(res);
  };
  return (
    <BigContainer>
      <HashRouter>
        <GlobalStyles />
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
        <Post
          post={{
            heading: "crazy 😲😲",
            comments: [],
            text: "Today was pretty, cooooooooooool. Thought I should let y'all know :) If y'all need anything else, lmk brb",
          }}
        />
        <Post
          post={{
            heading: "cool 😎🐵",
            comments: [],
            image:
              "https://i.pinimg.com/564x/89/e9/99/89e999dd299dd837a4693cd39f6a1cd6.jpg",
          }}
        />
        <Post
          post={{
            text: "Check this out! Now this is a cool costume right?",
            comments: [
              {
                author: {
                  name: "Diego R.",
                  profile_photo:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pittsburgh_Comicon_2007_woman_dressed_as_Spider-Girl.jpg/1200px-Pittsburgh_Comicon_2007_woman_dressed_as_Spider-Girl.jpg",
                },
                date: "Mar 12, 2021",
                text: "I liked your post, cheers to that!",
              },
            ],
            image:
              "https://http2.mlstatic.com/D_NQ_NP_13591-MLA73086868_1567-O.jpg",
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
      </HashRouter>
    </BigContainer>
  );
};
