import React from "react";
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
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

export default ({ type }) => {
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
          <StyledIcon
            className={`fa-solid ${
              type !== "comment" ? "fa-camera-retro" : "fa-comments"
            }`}
          />
          &nbsp;
          {type === "comment"
            ? "Commenting on Arianna's post"
            : "New photo post"}
        </RegularButton>
        {type !== "comment" && (
          <SquaredInput placeholder="How are you feeling, Diego? 🐵, 😴 or 💋?" />
        )}
        <SquaredTextArea
          placeholder={
            type !== "comment"
              ? "Tell us about it here..."
              : "Write your comment..."
          }
        />
        {type !== "comment" && (
          <SquaredInput type="file" placeholder="Show us with a picture" />
        )}
        <FlexContainer className="padd-0">
          <RegularButton className="blue">{`Save ${type}`}</RegularButton>
          <RegularButton>Cancel and go back</RegularButton>
        </FlexContainer>
      </FormFlexContainer>
    </PostWrapper>
  );
};
