import React from "react";
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
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

export default () => {
  return (
    <PostWrapper>
      <FlexContainer className="center-y">
        <CircleContainer>
          <ImageForContainer src="https://cdns-images.dzcdn.net/images/artist/68f1b025d3f2f412e09d3a3a27f904db/500x500.jpg" />
        </CircleContainer>
        <FlexColumnGrowElementCenter>
          <StyledRegularP className="grey">Logged in as</StyledRegularP>
          <BoldRegularLink>Diego Romero</BoldRegularLink>
        </FlexColumnGrowElementCenter>
        <RegularButton className="transparent no-grow">
          <StyledIcon className="fa-solid fa-circle-xmark large" />
        </RegularButton>
      </FlexContainer>
      <FormFlexContainer>
        <RegularButton className="transparent selected no-grow">
          <StyledIcon className="fa-solid fa-wrench" />
          &nbsp;Edit profile
        </RegularButton>
        <SquaredInput type="file" placeholder="Change profile" />
        <SquaredInput placeholder="Diego Romero" />
        <FlexContainer className="padd-0">
          <RegularButton className="blue">Save profile</RegularButton>
          <RegularButton>Cancel and go back</RegularButton>
        </FlexContainer>
      </FormFlexContainer>
      <Separator />
      <FlexContainer>
        <RegularButton className="red">One-click delete account</RegularButton>
      </FlexContainer>
    </PostWrapper>
  );
};
