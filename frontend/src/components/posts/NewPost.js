import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { sendData } from "../../lib/api";
import { setActiveForm } from "../slices/activeFormSlice";
import {
  FormFlexContainer,
  RegularButton,
  SquaredInput,
  SquaredTextArea,
} from "../utilities/FormElements";
import {
  ImageForContainer,
  StyledIcon,
  StyledRegularP,
} from "../utilities/Misc";
import { BoldRegularLink, PostWrapper } from "../utilities/postElements";
import {
  BigContainer,
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

const NewPost = ({ type, session, dispatch }) => {
  const [dataType, setDataType] = useState({});
  useEffect(() => {
    let icon = "";
    let message = "";
    switch (type) {
      case "comment":
        icon = "fa-comment-dots";
        message = "Write your comment...";
        break;
      case "image-post":
        icon = "fa-camera-retro";
        message = "Describe the photo...";
        break;
      case "emotion-post":
        icon = "fa-face-grin-tears";
        message = "Tell us about it...";
        break;
      default:
        icon = "fa-book-open";
        message = "Write your thoughts...";
        break;
    }
    setDataType({
      icon,
      message,
    });
  }, []);
  return (
    <BigContainer>
      <PostWrapper className="pop-on">
        <FlexContainer className="center-y">
          <CircleContainer>
            <ImageForContainer src={session.user.profile_photo} />
          </CircleContainer>
          <FlexColumnGrowElementCenter>
            <StyledRegularP className="grey">Logged in as</StyledRegularP>
            <BoldRegularLink>{session.user.full_name}</BoldRegularLink>
          </FlexColumnGrowElementCenter>
          <RegularButton
            className="transparent no-grow"
            onClick={() => dispatch(setActiveForm(""))}
          >
            <StyledIcon className="fa-solid fa-circle-xmark large" />
          </RegularButton>
        </FlexContainer>
        <FormFlexContainer onSubmit={sendData} encType="multipart/form-data">
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
