import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchFeed, sendData } from "../../lib/api";
import { setActiveForm } from "../slices/activeFormSlice";
import { setCurrentPost } from "../slices/currentPostSlice";
import { toggleLoading } from "../slices/loadingSlice";
import { deleteSession, writeSession } from "../slices/sessionSlice";
import {
  FormFlexContainer,
  RegularButton,
  SquaredInput,
} from "../utilities/FormElements";
import {
  ImageForContainer,
  Separator,
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

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.session.value);
  const handleSubmit = (e) => {
    dispatch(toggleLoading());
    const url = `https://frends-social.herokuapp.com/users/${session.user._id}/`;
    history.push("/login");
    sendData("put", url, session.token, e).then(() => {
      dispatch(setActiveForm(""));
      dispatch(deleteSession());
      dispatch(toggleLoading());
    });
  };
  return (
    <BigContainer>
      <PostWrapper>
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
        <FormFlexContainer
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <RegularButton className="transparent selected no-grow">
            <StyledIcon className="fa-solid fa-wrench" />
            &nbsp;Edit profile
          </RegularButton>
          <SquaredInput
            name="profile_photo"
            type="file"
            placeholder="Change profile picture"
          />
          <SquaredInput
            placeholder="First name"
            name="first_name"
            defaultValue={session.user.first_name}
          />
          <SquaredInput
            placeholder="Last name"
            name="last_name"
            defaultValue={session.user.last_name}
          />
          <FlexContainer className="padd-0">
            <RegularButton className="blue">Save profile</RegularButton>
            <RegularButton onClick={() => dispatch(setActiveForm(""))}>
              Cancel and go back
            </RegularButton>
          </FlexContainer>
        </FormFlexContainer>
      </PostWrapper>
    </BigContainer>
  );
};
