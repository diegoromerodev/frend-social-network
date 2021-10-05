import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchFeed, sendData } from "../../lib/api";
import { setMessageOnSwitch } from "../../lib/dataProcessing";
import { setActiveForm } from "../slices/activeFormSlice";
import { setCurrentPost } from "../slices/currentPostSlice";
import { toggleLoading } from "../slices/loadingSlice";
import {
  FormFlexContainer,
  RegularButton,
  SquaredInput,
  SquaredTextArea,
} from "../utilities/FormElements";
import LoggedAsHeader from "../utilities/LoggedAsHeader";
import { StyledIcon } from "../utilities/Misc";
import { PostWrapper } from "../utilities/postElements";
import { BigContainer, FlexContainer } from "../utilities/SpaceContainers";

const EditPost = ({ type, session, dispatch, setReloadFeed, author, post }) => {
  const [dataType, setDataType] = useState({});
  useEffect(() => {
    setDataType(setMessageOnSwitch(type));
  }, []);
  const handleSubmit = (e) => {
    dispatch(toggleLoading());
    const url = `http://192.168.0.104:3000/users/${session.user._id}/posts/${post._id}`;
    sendData("put", url, session.token, e).then((data) => {
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
            <StyledIcon className="fa-solid fa-highlighter" />
            &nbsp; Editing post
          </RegularButton>
          {post.heading && (
            <SquaredInput
              name="heading"
              placeholder={`How are you feeling, ${session.user.first_name}? 🐵, 😴 or 💋?`}
              defaultValue={post.heading}
            />
          )}
          <SquaredTextArea
            name="text"
            placeholder="Tell us about anything..."
            defaultValue={post.text}
          />
          {post.image && (
            <SquaredInput
              name="image"
              type="file"
              placeholder="Show us with a picture"
            />
          )}
          <FlexContainer className="padd-0">
            <RegularButton className="blue">Save post</RegularButton>
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
  const { activeForm, session, currentPost } = state;
  let author = {};
  if (currentPost.value) {
    author = currentPost.value.author;
  }
  return {
    type: activeForm.value,
    session: session.value,
    post: currentPost.value,
    author,
  };
};

export default connect(mapStateToProps)(EditPost);
