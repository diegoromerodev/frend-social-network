import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../lib/api";
import { addUserGeneral, removeUserGeneral } from "./slices/sessionSlice";
import { RegularButton } from "./utilities/FormElements";
import { ImageForContainer, Separator } from "./utilities/Misc";
import { BoldRegularLink } from "./utilities/postElements";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./utilities/SpaceContainers";

export default ({ id, requestType }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.value);
  useEffect(() => {
    fetchFeed(session.token, id, "user").then((data) => {
      setUser(data);
    });
  }, []);
  return (
    <>
      <Separator />
      <FlexContainer className="center-y">
        <CircleContainer>
          <ImageForContainer src={user.profile_photo} />
        </CircleContainer>
        <FlexColumnGrowElementCenter>
          <BoldRegularLink>{user.full_name}</BoldRegularLink>
        </FlexColumnGrowElementCenter>
        {requestType === "received_requests" ? (
          <>
            <RegularButton
              className="blue no-grow"
              onClick={() => {
                dispatch(
                  addUserGeneral({
                    field: "friends",
                    elId: user._id,
                  })
                );
              }}
            >
              Accept
            </RegularButton>
            <RegularButton
              className="red no-grow"
              onClick={() => {
                dispatch(
                  removeUserGeneral({
                    field: "received_requests",
                    elId: user._id,
                  })
                );
              }}
            >
              Decline
            </RegularButton>
          </>
        ) : (
          <RegularButton
            className="red no-grow"
            onClick={() => {
              dispatch(
                removeUserGeneral({
                  field: "sent_requests",
                  elId: user._id,
                })
              );
            }}
          >
            Cancel request
          </RegularButton>
        )}
      </FlexContainer>
    </>
  );
};
