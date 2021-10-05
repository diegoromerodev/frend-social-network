import React, { useEffect, useState } from "react";
import { RegularButton } from "../utilities/FormElements";
import { Separator, StyledIcon } from "../utilities/Misc";
import { FlexContainer } from "../utilities/SpaceContainers";
import { manageLikes } from "../../lib/api";

export default ({
  handleComment,
  handleDelete,
  setNumberOfLikes,
  post,
  session,
}) => {
  const [liked, setLiked] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleLike = () => {
    if (liked) {
      manageLikes("delete", post._id, session.token);
      setLiked(false);
      setNumberOfLikes((prevState) => prevState - 1);
      return;
    }
    manageLikes("post", post._id, session.token);
    setLiked(true);
    setNumberOfLikes((prevState) => prevState + 1);
  };

  const onDeleteClick = () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    handleDelete(post._id, post.author._id);
    setConfirm(false);
  };

  useEffect(() => {
    if (post.likes) {
      setLiked(post.likes.includes(session.user._id));
    }
  }, []);
  return (
    <FlexContainer className="wrap padd-x">
      <Separator />
      <RegularButton
        className={liked ? "blue" : "transparent"}
        onClick={handleLike}
      >
        <StyledIcon className="fa-solid fa-heart" />
        &nbsp;Like
      </RegularButton>
      <RegularButton className="transparent" onClick={handleComment}>
        <StyledIcon className="fa-solid fa-comments" />
        &nbsp;Comment
      </RegularButton>
      {post.author._id === session.user._id && (
        <RegularButton className="red" onClick={onDeleteClick}>
          <StyledIcon className="fa-solid fa-trash-can white" />
          {!confirm ? "  Delete Post" : "  Are you sure?"}
        </RegularButton>
      )}
      <Separator />
    </FlexContainer>
  );
};
