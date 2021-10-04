import React from "react";
import { useSelector } from "react-redux";
import { MessageBubble, MessageContainer } from "../utilities/chatElements";
import { red } from "../utilities/colors";
import {
  ImageForContainer,
  StyledIcon,
  StyledRegularP,
} from "../utilities/Misc";
import { BoldRegularLink } from "../utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

export default ({ comments }) => {
  const session = useSelector((state) => state.session.value);
  return (
    <MessageContainer className="comments">
      {comments.map((msg) => (
        <FlexContainer className="transparent">
          <CircleContainer>
            <ImageForContainer src={msg.author.profile_photo} />
          </CircleContainer>
          <FlexColumnGrowElementCenter>
            <MessageBubble>
              <StyledRegularP>{msg.text}</StyledRegularP>
            </MessageBubble>
            <StyledRegularP className={`grey `}>
              {`${msg.author.full_name} • ${msg.formatted_creation}`} •{" "}
              <StyledIcon className="fa-solid fa-heart" />
              &nbsp; {msg.likes.length} Like{msg.likes.length === 1 ? "" : "s"}
            </StyledRegularP>
            <FlexContainer className="padd-y">
              <BoldRegularLink>
                <StyledIcon className="fa-solid fa-thumbs-up" /> &nbsp; Like
              </BoldRegularLink>

              {true && (
                <>
                  <StyledRegularP>-</StyledRegularP>
                  <BoldRegularLink
                    style={{
                      color: red,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <StyledIcon
                      style={{ color: red }}
                      className="fa-solid fa-xmark"
                    />
                    &nbsp; Delete
                  </BoldRegularLink>
                </>
              )}
            </FlexContainer>
          </FlexColumnGrowElementCenter>
        </FlexContainer>
      ))}
    </MessageContainer>
  );
};
