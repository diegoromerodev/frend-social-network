import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
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

const NewPost = ({ type, session, dispatch, setReloadFeed, author, post }) => {
  const [dataType, setDataType] = useState({});
  useEffect(() => {
    setDataType(setMessageOnSwitch(type));
  }, []);
  const handleSubmit = (e) => {
    dispatch(toggleLoading());
    const url =
      type === "comment"
        ? `https://frends-social.herokuapp.com/posts/${post._id}/comments`
        : `https://frends-social.herokuapp.com/users/${session.user._id}/posts`;
    sendData("post", url, session.token, e).then(() => {
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
            <StyledIcon className={`fa-solid ${dataType.icon}`} />
            &nbsp;
            {`New ${type.replace("-", " ")}`}
            {author.full_name &&
              ` on ${author.full_name}${
                author.full_name[author.full_name.length - 1] === "s"
                  ? "'"
                  : "'s"
              } post`}
          </RegularButton>
          {type === "emotion-post" && (
            <SquaredInput
              name="heading"
              placeholder={`How are you feeling, ${session.user.first_name}? 🐵, 😴 or 💋?`}
            />
          )}
          <SquaredTextArea name="text" placeholder={dataType.message} />
          {type === "image-post" && (
            <SquaredInput
              name="image"
              type="file"
              placeholder="Show us with a picture"
            />
          )}
          <FlexContainer className="padd-0">
            <RegularButton className="blue">{`Save ${
              type === "comment" ? "comment" : "post"
            }`}</RegularButton>
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

export default connect(mapStateToProps)(NewPost);
