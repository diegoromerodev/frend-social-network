import React, { useEffect, useState } from "react";
import { manageCommentLikes } from "../../lib/api";
import { MessageBubble } from "../utilities/chatElements";
import {
  ImageForContainer,
  StyledIcon,
  StyledRegularP,
} from "../utilities/Misc";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";
import CommentActions from "./CommentActions";

export default ({ comment, post, session, confirm }) => {
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(comment.likes.length);
  const handleLike = () => {
    if (liked) {
      manageCommentLikes(session.token, post._id, comment._id, "delete");
      setLiked(false);
      setNumberOfLikes((prevState) => prevState - 1);
      return;
    }
    manageCommentLikes(session.token, post._id, comment._id, "post");
    setLiked(true);
    setNumberOfLikes((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (comment.likes) {
      setLiked(comment.likes.includes(session.user._id));
    }
  }, []);
  return (
    <FlexContainer className="transparent">
      <CircleContainer to={`/users/${comment?.author?._id}`}>
        <ImageForContainer src={comment?.author?.profile_photo} />
      </CircleContainer>
      <FlexColumnGrowElementCenter>
        <MessageBubble>
          <StyledRegularP>{comment.text}</StyledRegularP>
        </MessageBubble>
        <StyledRegularP className={`grey `}>
          {`${comment.author?.full_name} • ${comment.formatted_creation}`} •{" "}
          <StyledIcon className="fa-solid fa-heart" />
          &nbsp; {numberOfLikes} Like
          {numberOfLikes === 1 ? "" : "s"}
        </StyledRegularP>
        <CommentActions
          handleLike={handleLike}
          liked={liked}
          comment={comment}
          session={session}
          post={post}
          confirm={confirm}
        />
      </FlexColumnGrowElementCenter>
    </FlexContainer>
  );
};
