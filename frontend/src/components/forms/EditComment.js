import React from "react";
import { connect } from "react-redux";
import { fetchFeed, sendData } from "../../lib/api";
import { setActiveForm } from "../slices/activeFormSlice";
import { setCurrentPost } from "../slices/currentPostSlice";
import { toggleLoading } from "../slices/loadingSlice";
import {
  FormFlexContainer,
  RegularButton,
  SquaredTextArea,
} from "../utilities/FormElements";
import LoggedAsHeader from "../utilities/LoggedAsHeader";
import { StyledIcon } from "../utilities/Misc";
import { PostWrapper } from "../utilities/postElements";
import { BigContainer, FlexContainer } from "../utilities/SpaceContainers";

const EditComment = ({ session, dispatch, comment, post }) => {
  const handleSubmit = (e) => {
    dispatch(toggleLoading());
    const url = `http://192.168.0.104:3000/posts/${post._id}/comments/${comment._id}`;
    sendData("put", url, session.token, e).then(() => {
      dispatch(setActiveForm(""));
      fetchFeed(session.token, post.id, "post").then((data) => {
        dispatch(setCurrentPost(data));
        dispatch(toggleLoading());
      });
    });
  };
  return (
    <BigContainer>
      <PostWrapper className="pop-on">
        <LoggedAsHeader user={session.user} />
        <FormFlexContainer
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <RegularButton className="transparent selected no-grow">
            <StyledIcon className="fa-solid fa-keyboard" />
            &nbsp; Editing comment
          </RegularButton>
          <SquaredTextArea
            name="text"
            placeholder="Add something to say"
            defaultValue={comment.text}
          />
          <FlexContainer className="padd-0">
            <RegularButton className="blue">Save comment</RegularButton>
            <RegularButton onClick={() => dispatch(setActiveForm(""))}>
              Cancel and go back
            </RegularButton>
          </FlexContainer>
        </FormFlexContainer>
      </PostWrapper>
    </BigContainer>
  );
};

const mapStateToProps = (state) => {
  const { activeForm, session, currentComment, currentPost } = state;
  return {
    type: activeForm.value,
    session: session.value,
    post: currentPost.value,
    comment: currentComment.value,
  };
};

export default connect(mapStateToProps)(EditComment);
