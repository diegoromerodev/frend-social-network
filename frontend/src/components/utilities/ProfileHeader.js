import React from "react";
import ProfileActions from "../ProfileActions";
import { RegularButton } from "./FormElements";
import { ImageForContainer, StyledRegularP } from "./Misc";
import { PostWrapper } from "./postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./SpaceContainers";

export default ({ user, session }) => {
  if (!user?._id) return null;
  return (
    <PostWrapper>
      <FlexContainer>
        <FlexColumnGrowElementCenter className="center gap-y">
          <CircleContainer className="large" to="#">
            <ImageForContainer src={user.profile_photo} />
          </CircleContainer>
          <StyledRegularP className="large">{user.full_name}</StyledRegularP>
          <FlexContainer className="padd-0">
            <ProfileActions user={user} session={session} />
          </FlexContainer>
        </FlexColumnGrowElementCenter>
      </FlexContainer>
    </PostWrapper>
  );
};
