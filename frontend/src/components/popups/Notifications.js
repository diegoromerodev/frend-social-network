import React from "react";
import { useSelector } from "react-redux";
import { RegularButton } from "../utilities/FormElements";
import { StyledIcon } from "../utilities/Misc";
import { PostWrapper } from "../utilities/postElements";
import { FlexContainer } from "../utilities/SpaceContainers";
import NotificationItem from "./NotificationItem";

export default () => {
  const notifications = useSelector((state) => state.realTime.notifications);
  const session = useSelector((state) => state.session.value);
  return session?.user?.first_name ? (
    <PostWrapper>
      <FlexContainer>
        <RegularButton className="transparent selected">
          <StyledIcon className="fa-solid fa-bell" />
          &nbsp;{session?.user?.first_name}&apos;s notification center
        </RegularButton>
      </FlexContainer>
      {notifications.map((notification) => (
        <NotificationItem notification={notification} />
      ))}
    </PostWrapper>
  ) : null;
};
