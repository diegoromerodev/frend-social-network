import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { manageNotifications } from "../../lib/api";
import { blue } from "../utilities/colors";
import { RegularButton } from "../utilities/FormElements";
import {
  ImageForContainer,
  Separator,
  StyledIcon,
  StyledRegularP,
} from "../utilities/Misc";
import { BoldRegularLink } from "../utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";

export default ({ notification }) => {
  const [icon, setIcon] = useState({});
  const session = useSelector((state) => state.session.value);
  useEffect(() => {
    manageNotifications(
      session.token,
      "put",
      session.user._id,
      notification._id
    );
    if (notification.text.includes("like")) {
      setIcon("fa-heart");
      return;
    }
    setIcon("fa-comment");
  }, []);
  const handleDelete = () => {
    manageNotifications(
      session.token,
      "delete",
      session.user._id,
      notification._id
    );
  };
  return (
    <>
      <Separator />
      <FlexContainer className="center-y spb-x">
        <BoldRegularLink to={`/posts/${notification.url}`}>
          <FlexColumnGrowElementCenter>
            <FlexContainer className="center-y">
              <StyledIcon
                className={`large fa-solid ${icon}`}
                style={{ color: blue }}
              />
              <StyledRegularP>{notification.text}</StyledRegularP>
            </FlexContainer>
          </FlexColumnGrowElementCenter>
        </BoldRegularLink>
        <RegularButton className="transparent no-grow" onClick={handleDelete}>
          <StyledIcon className="fa-solid fa-circle-xmark large" />
        </RegularButton>
      </FlexContainer>
    </>
  );
};
