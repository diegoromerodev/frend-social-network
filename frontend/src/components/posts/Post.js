import React from "react";
import CommentSection from "./CommentSection";

import { RegularButton, RoundedInputButton } from "../utilities/FormElements";
import { ImageForContainer, Separator, StyledIcon } from "../utilities/Misc";
import {
  BoldRegularLink,
  LikesContainer,
  PostBody,
  PostHeader,
  PostImage,
  PostLink,
  PostWrapper,
} from "../utilities/postElements";
import { CircleContainer, FlexContainer } from "../utilities/SpaceContainers";

export default ({ post }) => {
  return (
    <PostWrapper className="up-motion">
      {post.author && (
        <PostHeader
          image={post.author.profile_photo}
          username={post.author.full_name}
          date={post.formatted_creation}
          heading={post.heading}
        />
      )}
      {post.text && <PostBody to="/">{post.text}</PostBody>}
      {post.image && (
        <PostLink to="/" image={post.image}>
          <PostImage src={post.image} />
        </PostLink>
      )}
      <FlexContainer className="center-y spb-x padd-x padd-1-2">
        {post.likes && (
          <LikesContainer>
            <StyledIcon className="fa-solid fa-heart" />
            &nbsp;{post.likes.length} Like{post.likes.length === 1 ? "" : "s"}
          </LikesContainer>
        )}
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
      {post.comments && <CommentSection comments={post.comments} />}
      <FlexContainer>
        <CircleContainer>
          <ImageForContainer src="https://i.pinimg.com/564x/ed/02/62/ed02622c207a5b4b4d9acb065b44b55f.jpg" />
        </CircleContainer>
        <RoundedInputButton>Write a comment...</RoundedInputButton>
      </FlexContainer>
    </PostWrapper>
  );
};
