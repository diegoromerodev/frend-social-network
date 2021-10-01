import React, { useEffect, useRef } from "react";
import {
  MessageBubble,
  MessageContainer,
  UserChatButton,
} from "./utilities/chatElements";
import {
  FormFlexContainer,
  RegularButton,
  RoundedInputField,
} from "./utilities/FormElements";
import { ImageForContainer, Separator, StyledRegularP } from "./utilities/Misc";
import { PostWrapper } from "./utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./utilities/SpaceContainers";

const users = [
  {
    name: "Diego Loco",
    date: "Jan 10, 2021",
    profile_photo:
      "https://cumpletizi.files.wordpress.com/2008/06/cars-mcqueen-01.jpg",
  },
  {
    name: "Arturo Jose",
    date: "Jan 13, 2021",
    profile_photo:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/personal-weight-training-in-the-gym-royalty-free-image-1568020980.jpg",
  },
  {
    name: "Maria Jose",
    date: "Jan 16, 2021",
    profile_photo: "https://i.ytimg.com/vi/nf8ySuesAPg/maxresdefault.jpg",
  },
];

const messages = [
  {
    sender: {
      _id: "12a",
      profile_photo:
        "http://pm1.narvii.com/7638/cc6f38d9d72758bec08b88f7cb3f465fff8501f4r1-973-974v2_uhq.jpg",
      name: "Diego R.",
    },
    text: "how was school?",
    date: "Jan 12, 2021 at 12:30pm",
  },
  {
    sender: {
      _id: "33b",
      profile_photo:
        "https://pbs.twimg.com/profile_images/3245831024/946cfdbdff9e2db230df671f12a2c9cb_400x400.png",
      name: "Carla X.",
    },
    text: "pretty cool yep",
    date: "Jan 12, 2021 at 12:30pm",
  },
  {
    sender: {
      _id: "12a",
      profile_photo:
        "http://pm1.narvii.com/7638/cc6f38d9d72758bec08b88f7cb3f465fff8501f4r1-973-974v2_uhq.jpg",
      name: "Diego R.",
    },
    text: "How about",
    date: "Jan 12, 2021 at 12:30pm",
  },
  {
    sender: {
      _id: "33b",
      profile_photo:
        "https://pbs.twimg.com/profile_images/3245831024/946cfdbdff9e2db230df671f12a2c9cb_400x400.png",
      name: "Carla X.",
    },
    text: "what now",
    date: "Jan 12, 2021 at 12:30pm",
  },
  {
    sender: {
      _id: "12a",
      profile_photo:
        "http://pm1.narvii.com/7638/cc6f38d9d72758bec08b88f7cb3f465fff8501f4r1-973-974v2_uhq.jpg",
      name: "Diego R.",
    },
    text: "Cats ar nice when you aren't really lookin, but the moment you start looking, they'll definitely kill you",
    date: "Jan 12, 2021 at 12:30pm",
  },
  {
    sender: {
      _id: "33b",
      profile_photo:
        "https://pbs.twimg.com/profile_images/3245831024/946cfdbdff9e2db230df671f12a2c9cb_400x400.png",
      name: "Carla X.",
    },
    text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    date: "Jan 12, 2021 at 12:30pm",
  },
  {
    sender: {
      _id: "33b",
      profile_photo:
        "https://pbs.twimg.com/profile_images/3245831024/946cfdbdff9e2db230df671f12a2c9cb_400x400.png",
      name: "Carla X.",
    },
    text: "I found it!!!!!!!",
    date: "Jan 12, 2021 at 12:30pm",
  },
];

export default () => {
  const allUsersChats = useRef(null);
  const chatBox = useRef(null);
  useEffect(() => {
    chatBox.current.scroll(0, chatBox.current.scrollHeight);
  });
  useEffect(() => {
    allUsersChats.current.scroll({
      left: 100,
      behavior: "smooth",
    });
  }, []);
  return (
    <PostWrapper>
      <FlexContainer ref={allUsersChats} className="scroll-x">
        {users.map((user) => (
          <UserChatButton user={user} />
        ))}
        {users.map((user) => (
          <UserChatButton user={user} />
        ))}
        {users.map((user) => (
          <UserChatButton user={user} />
        ))}
      </FlexContainer>
      <MessageContainer ref={chatBox}>
        {messages.map((msg) => (
          <FlexContainer
            className={`transparent ${msg.sender._id === "12a" && "reversed"}`}
          >
            <CircleContainer>
              <ImageForContainer src={msg.sender.profile_photo} />
            </CircleContainer>
            <FlexColumnGrowElementCenter>
              <MessageBubble
                message={msg}
                className={msg.sender._id === "12a" && "blue"}
              >
                <StyledRegularP>{msg.text}</StyledRegularP>
              </MessageBubble>
              <StyledRegularP
                className={`grey ${msg.sender._id === "12a" && "right-align"}`}
              >
                {msg.date}
              </StyledRegularP>
            </FlexColumnGrowElementCenter>
          </FlexContainer>
        ))}
      </MessageContainer>
      <FormFlexContainer>
        <RoundedInputField placeholder={`Reply to ${users[0].name}`} />
        <RegularButton className="blue">Send Message</RegularButton>
      </FormFlexContainer>
    </PostWrapper>
  );
};
