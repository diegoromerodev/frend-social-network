import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserGeneral, removeUserGeneral } from "../slices/sessionSlice";
import { RegularButton } from "../utilities/FormElements";
import { ImageForContainer, Separator } from "../utilities/Misc";
import { BoldRegularLink } from "../utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";
import { highlight } from "./Search";

export default ({ user, query }) => {
  const currUser = useSelector((state) => state.session.value.user);
  const [isInField, setIsInField] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currUser.friends.includes(user._id)) setIsInField("friends");
    else if (currUser.sent_requests.includes(user._id))
      setIsInField("sent_requests");
    else if (currUser.received_requests.includes(user._id))
      setIsInField("received_requests");
    else setIsInField(null);
  }, [currUser]);
  console.log(isInField);
  return (
    user._id && (
      <>
        <Separator />
        <FlexContainer className="center-y">
          <CircleContainer>
            <ImageForContainer src={user.profile_photo} />
          </CircleContainer>
          <FlexColumnGrowElementCenter>
            <BoldRegularLink className="no-flex">
              {highlight(user.full_name, query)}
            </BoldRegularLink>
          </FlexColumnGrowElementCenter>
          {!isInField ? (
            <RegularButton
              className="blue no-grow"
              onClick={() =>
                dispatch(
                  addUserGeneral({ field: "sent_requests", elId: user._id })
                )
              }
            >
              Send request
            </RegularButton>
          ) : (
            <RegularButton
              className="red no-grow"
              onClick={() => {
                dispatch(
                  removeUserGeneral({
                    field: isInField,
                    elId: user._id,
                  })
                );
              }}
            >
              {isInField === "friends"
                ? "Remove friend"
                : "Cancel friend request"}
            </RegularButton>
          )}
        </FlexContainer>
      </>
    )
  );
};
