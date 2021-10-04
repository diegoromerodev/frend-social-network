import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { sendData } from "../../lib/api";
import { setMessageOnSwitch } from "../../lib/dataProcessing";
import { setActiveForm } from "../slices/activeFormSlice";
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

const NewPost = ({ type, session, dispatch, setReloadFeed }) => {
  const [dataType, setDataType] = useState({});
  useEffect(() => {
    setDataType(setMessageOnSwitch(type));
  }, []);
  const handleSubmit = (e) => {
    sendData(
      "post",
      `http://192.168.0.104:3000/users/${session.user._id}/posts`,
      session.token,
      e
    ).then(() => {
      dispatch(setActiveForm(""));
      setReloadFeed(Date.now());
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
  const { activeForm, session } = state;
  return { type: activeForm.value, session: session.value };
};

export default connect(mapStateToProps)(NewPost);
