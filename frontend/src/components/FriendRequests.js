import React, { useState } from "react";
import { useSelector } from "react-redux";
import RequestItem from "./RequestItem";
import { RegularButton } from "./utilities/FormElements";
import { PostWrapper } from "./utilities/postElements";
import { FlexContainer } from "./utilities/SpaceContainers";

export default () => {
  const [requestType, setRequestType] = useState("received_requests");
  const session = useSelector((state) => state.session.value);
  return (
    <PostWrapper>
      <FlexContainer>
        <RegularButton
          className={`transparent ${
            requestType === "received_requests" && "selected"
          }`}
          onClick={() => setRequestType("received_requests")}
        >
          Pending Requests
        </RegularButton>
        <RegularButton
          className={`transparent ${
            requestType === "sent_requests" && "selected"
          }`}
          onClick={() => setRequestType("sent_requests")}
        >
          Sent Requests
        </RegularButton>
      </FlexContainer>
      {session.user &&
        session.user[requestType].map((user) => (
          <RequestItem id={user} requestType={requestType} />
        ))}
    </PostWrapper>
  );
};
