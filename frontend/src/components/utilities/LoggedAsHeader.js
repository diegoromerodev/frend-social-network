import React from "react";
import { useDispatch } from "react-redux";
import { setActiveForm } from "../slices/activeFormSlice";
import { RegularButton } from "./FormElements";
import { ImageForContainer, StyledIcon, StyledRegularP } from "./Misc";
import { BoldRegularLink } from "./postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./SpaceContainers";

export default ({ user }) => {
  const dispatch = useDispatch();

  return (
    <FlexContainer className="center-y">
      <CircleContainer>
        <ImageForContainer src={user.profile_photo} />
      </CircleContainer>
      <FlexColumnGrowElementCenter>
        <StyledRegularP className="grey">Logged in as</StyledRegularP>
        <BoldRegularLink>{user.full_name}</BoldRegularLink>
      </FlexColumnGrowElementCenter>
      <RegularButton
        className="transparent no-grow"
        onClick={() => dispatch(setActiveForm(""))}
      >
        <StyledIcon className="fa-solid fa-circle-xmark large" />
      </RegularButton>
    </FlexContainer>
  );
};
