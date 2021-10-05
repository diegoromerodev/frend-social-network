import React from "react";
import { MessageBubble } from "./utilities/chatElements";
import { ImageForContainer, StyledRegularP } from "./utilities/Misc";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./utilities/SpaceContainers";

export default ({ msg, session }) => {
  return (
    <FlexContainer
      className={`transparent ${
        msg.sender._id === session.user._id && "reversed"
      }`}
    >
      <CircleContainer>
        <ImageForContainer src={msg.sender.profile_photo} />
      </CircleContainer>
      <FlexColumnGrowElementCenter>
        <MessageBubble
          message={msg}
          className={msg.sender._id === session.user._id && "blue"}
        >
          <StyledRegularP>{msg.text}</StyledRegularP>
        </MessageBubble>
        <StyledRegularP
          className={`grey ${
            msg.sender._id === session.user._id && "right-align"
          }`}
        >
          {msg.formatted_date}
        </StyledRegularP>
      </FlexColumnGrowElementCenter>
    </FlexContainer>
  );
};
