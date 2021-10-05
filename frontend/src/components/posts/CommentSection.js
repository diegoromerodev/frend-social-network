import React from "react";
import { useSelector } from "react-redux";
import { MessageContainer } from "../utilities/chatElements";
import CommentItem from "./CommentItem";

export default ({ comments, post }) => {
  const session = useSelector((state) => state.session.value);

  return (
    <MessageContainer className="comments">
      {comments.map(
        (comment) =>
          comment.author && (
            <CommentItem
              key={comment._id}
              comment={comment}
              session={session}
              post={post}
              confirm={confirm}
            />
          )
      )}
    </MessageContainer>
  );
};
