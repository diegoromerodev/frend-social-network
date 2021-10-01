import React from "react";
import { MessageBubble, MessageContainer } from "./utilities/chatElements";
import { red } from "./utilities/colors";
import { RegularButton, RoundedInputButton } from "./utilities/FormElements";
import {
  ImageForContainer,
  Separator,
  StyledIcon,
  StyledRegularP,
} from "./utilities/Misc";
import {
  BoldRegularLink,
  LikesContainer,
  PostBody,
  PostHeader,
  PostImage,
  PostLink,
  PostWrapper,
} from "./utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./utilities/SpaceContainers";

export default ({ post }) => {
  return (
    <PostWrapper>
      <PostHeader
        image="https://st.depositphotos.com/2283107/2874/i/950/depositphotos_28745541-stock-photo-cool-dude-dog-wearing-sunglasses.jpg"
        username="El Perro Gato"
        date="July 20, 2021"
        heading={post.heading}
      />
      {post.text && <PostBody to="/">{post.text}</PostBody>}
      {post.image && (
        <PostLink to="/" image={post.image}>
          <PostImage src={post.image} />
        </PostLink>
      )}
      <FlexContainer className="center-y spb-x padd-x padd-1-2">
        <LikesContainer>
          <StyledIcon className="fa-solid fa-heart" />
          &nbsp;0 Likes
        </LikesContainer>
        <BoldRegularLink>10 comments</BoldRegularLink>
      </FlexContainer>
      <FlexContainer className="wrap padd-x">
        <Separator />
        <RegularButton className="transparent">
          <StyledIcon className="fa-solid fa-heart" />
          &nbsp;Like
        </RegularButton>
        <RegularButton className="transparent">
          <StyledIcon className="fa-solid fa-comments" />
          &nbsp;Comment
        </RegularButton>
        <RegularButton className="red">Delete Post</RegularButton>
        <Separator />
      </FlexContainer>
      <MessageContainer className="comments">
        {post.comments.map((msg) => (
          <FlexContainer className="transparent">
            <CircleContainer>
              <ImageForContainer src={msg.author.profile_photo} />
            </CircleContainer>
            <FlexColumnGrowElementCenter>
              <MessageBubble>
                <StyledRegularP>{msg.text}</StyledRegularP>
              </MessageBubble>
              <StyledRegularP className={`grey `}>
                {`${msg.author.name} • ${msg.date}`} •{" "}
                <StyledIcon className="fa-solid fa-heart" /> 10 Likes
              </StyledRegularP>
              <FlexContainer className="padd-0">
                <BoldRegularLink>Like</BoldRegularLink>
                <StyledRegularP>-</StyledRegularP>
                <BoldRegularLink style={{ color: red }}>Delete</BoldRegularLink>
              </FlexContainer>
            </FlexColumnGrowElementCenter>
          </FlexContainer>
        ))}
      </MessageContainer>
      <FlexContainer>
        <CircleContainer>
          <ImageForContainer src="https://i.pinimg.com/564x/ed/02/62/ed02622c207a5b4b4d9acb065b44b55f.jpg" />
        </CircleContainer>
        <RoundedInputButton>Write a comment...</RoundedInputButton>
      </FlexContainer>
    </PostWrapper>
  );
};
