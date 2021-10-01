import React from "react";
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

export const UserChatButton = ({ user }) => {
  return (
    <RegularButton
      className={user.name === "Diego Loco" ? "blue" : "transparent"}
    >
      <FlexColumnGrowElementCenter className="center gap-y">
        <CircleContainer>
          <ImageForContainer src={user.profile_photo} />
        </CircleContainer>
        <FlexColumnGrowElementCenter>
          <BoldRegularLink to="/">{user.name}</BoldRegularLink>
          <StyledRegularP className="grey">
            {user.date || "No new messages"}
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
