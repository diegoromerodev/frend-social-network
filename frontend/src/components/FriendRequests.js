import React from "react";
import { useParams } from "react-router";
import { RegularButton } from "./utilities/FormElements";
import { ImageForContainer, Separator } from "./utilities/Misc";
import { BoldRegularLink, PostWrapper } from "./utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./utilities/SpaceContainers";

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
      <FlexContainer>
        <RegularButton className="transparent selected">
          Pending Requests
        </RegularButton>
        <RegularButton className="transparent">Sent Requests</RegularButton>
      </FlexContainer>
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
            <RegularButton className="blue no-grow">Accept</RegularButton>
            <RegularButton className="no-grow">Decline</RegularButton>
          </FlexContainer>
        </>
      ))}
    </PostWrapper>
  );
};
