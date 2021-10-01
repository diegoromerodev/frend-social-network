import React from "react";
import Post from "../Post";
import {
  FormFlexContainer,
  RegularButton,
  SquaredInput,
} from "../utilities/FormElements";
import { ImageForContainer, Separator, StyledIcon } from "../utilities/Misc";
import { BoldRegularLink, PostWrapper } from "../utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

const requests = [
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-pumpkins-at-market-royalty-free-image-1603205337.jpg",
    name: "Diego R.",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-106519389-1595002835.png",
    name: "Maria R.",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-pumpkins-at-market-royalty-free-image-1603205337.jpg",
    name: "Diego R.",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-106519389-1595002835.png",
    name: "Maria R.",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-pumpkins-at-market-royalty-free-image-1603205337.jpg",
    name: "Diego R.",
  },
  {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-106519389-1595002835.png",
    name: "Maria R.",
  },
];

export default () => {
  return (
    <PostWrapper>
      <FormFlexContainer>
        <FlexContainer className="padd-0">
          <FlexColumnGrowElementCenter>
            <SquaredInput placeholder="What are you looking for?" />
          </FlexColumnGrowElementCenter>
          <RegularButton className="blue no-grow">
            <StyledIcon className="fa-solid fa-magnifying-glass white" />
          </RegularButton>
        </FlexContainer>
      </FormFlexContainer>
      {requests.map((user) => (
        <>
          <Separator />
          <FlexContainer className="center-y">
            <CircleContainer>
              <ImageForContainer src={user.image} />
            </CircleContainer>
            <FlexColumnGrowElementCenter>
              <BoldRegularLink>{user.name}</BoldRegularLink>
            </FlexColumnGrowElementCenter>
            <RegularButton className="blue no-grow">Send request</RegularButton>
          </FlexContainer>
        </>
      ))}
      <Post
        post={{
          heading: "crazy 😲😲",
          comments: [],
          text: "Today was pretty, cooooooooooool. Thought I should let y'all know :) If y'all need anything else, lmk brb",
        }}
      />
      <Post
        post={{
          heading: "cool 😎🐵",
          comments: [],
          image:
            "https://i.pinimg.com/564x/89/e9/99/89e999dd299dd837a4693cd39f6a1cd6.jpg",
        }}
      />
    </PostWrapper>
  );
};
