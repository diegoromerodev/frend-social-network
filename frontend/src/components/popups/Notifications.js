import React from "react";
import { RegularButton } from "../utilities/FormElements";
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

const notifications = [
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-pumpkins-at-market-royalty-free-image-1603205337.jpg",
    name: "Diego R.",
    text: "liked your post",
    type: "like",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-106519389-1595002835.png",
    name: "Maria R.",
    text: "sent you a friend request",
    type: "friend",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-pumpkins-at-market-royalty-free-image-1603205337.jpg",
    name: "Diego R.",
    text: "liked your post",
    type: "like",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-106519389-1595002835.png",
    name: "Maria R.",
    text: "sent you a friend request",
    type: "friend",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-pumpkins-at-market-royalty-free-image-1603205337.jpg",
    name: "Diego R.",
    text: "liked your post",
    type: "like",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-106519389-1595002835.png",
    name: "Maria R.",
    text: "liked your post",
    type: "like",
  },
];

export default () => {
  return (
    <PostWrapper>
      <FlexContainer>
        <RegularButton className="transparent selected">
          <StyledIcon className="fa-solid fa-bell" />
          &nbsp;Diego&apos;s notification center
        </RegularButton>
      </FlexContainer>
      {notifications.map((user) => (
        <>
          <Separator />
          <FlexContainer className="center-y spb-x">
            <BoldRegularLink to="/">
              <CircleContainer>
                <ImageForContainer src={user.image} />
              </CircleContainer>
              <FlexColumnGrowElementCenter>
                <FlexContainer className="gap-x-half center-y">
                  <StyledIcon className="fa-solid fa-heart" />
                  <BoldRegularLink>{user.name}</BoldRegularLink>
                  <StyledRegularP>{user.text}</StyledRegularP>
                </FlexContainer>
              </FlexColumnGrowElementCenter>
            </BoldRegularLink>
            <RegularButton className="transparent no-grow">
              <StyledIcon className="fa-solid fa-circle-xmark large" />
            </RegularButton>
          </FlexContainer>
        </>
      ))}
    </PostWrapper>
  );
};
