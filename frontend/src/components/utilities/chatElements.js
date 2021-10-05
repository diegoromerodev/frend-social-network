import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { blue, dark, lighter, mild, milder, white } from "./colors";
import { RegularButton } from "./FormElements";
import { ImageForContainer, StyledRegularP } from "./Misc";
import { BoldRegularLink } from "./postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./SpaceContainers";

export const UserChatButton = ({
  chat,
  currChat,
  setCurrentChatId,
  session,
  setRecipient,
}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (chat.participants[0]._id === session.user._id) {
      setUser(chat.participants[1]);
      if (chat._id === currChat) setRecipient(chat.participants[1]);
      return;
    }
    setUser(chat.participants[0]);
    if (chat._id === currChat) setRecipient(chat.participants[0]);
  }, [currChat]);
  return (
    <RegularButton
      className={currChat === chat._id ? "blue" : "transparent"}
      onClick={() => setCurrentChatId(chat._id)}
    >
      <FlexColumnGrowElementCenter className="center gap-y">
        <CircleContainer to="#">
          <ImageForContainer src={user.profile_photo} />
        </CircleContainer>
        <FlexColumnGrowElementCenter>
          <BoldRegularLink to="#">{user.full_name}</BoldRegularLink>
          <StyledRegularP className="grey">
            {chat.messages.length || "No messages"}
          </StyledRegularP>
        </FlexColumnGrowElementCenter>
      </FlexColumnGrowElementCenter>
    </RegularButton>
  );
};

export const MessageContainer = styled.div`
  height: 60vh;
  background-color: ${milder};
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${mild};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${lighter};
    border-radius: 5px;
  }
  &.comments {
    background-color: ${mild};
    height: unset;
  }
`;

export const MessageBubble = styled.span`
  display: inline-block;
  background-color: ${lighter};
  margin: 0.2rem 0;
  align-self: flex-start;
  padding: 1rem;
  border-radius: 1rem;
  max-width: 70%;
  p {
    color: ${dark};
    font-size: 1.1rem;
    word-break: break-word;
  }
  &.blue {
    p {
      color: ${white};
    }
    background-color: ${blue};
    text-align: right;
    align-self: flex-end;
  }
`;
