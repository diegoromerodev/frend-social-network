import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createChatroom } from "../lib/api";
import { setActiveForm } from "./slices/activeFormSlice";
import { addUserGeneral, removeUserGeneral } from "./slices/sessionSlice";
import { RegularButton } from "./utilities/FormElements";

export default ({ user, session }) => {
  const currUser = useSelector((state) => state.session.value.user);
  const [isInField, setIsInField] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currUser.friends.includes(user._id)) setIsInField("friends");
    else if (currUser.sent_requests.includes(user._id))
      setIsInField("sent_requests");
    else if (currUser.received_requests.includes(user._id))
      setIsInField("received_requests");
    else setIsInField(null);
  }, [currUser]);

  const handleNewChatroom = () => {
    createChatroom(session.token, user._id).then(() => {
      history.push("/chatrooms");
    });
  };
  if (!session.user) return null;
  console.log(isInField);
  return (
    <>
      {user._id === session.user._id && (
        <RegularButton onClick={() => dispatch(setActiveForm("profile-edit"))}>
          Edit Profile
        </RegularButton>
      )}
      {!isInField && user._id !== session.user._id && (
        <RegularButton
          className="blue"
          onClick={() =>
            dispatch(addUserGeneral({ field: "sent_requests", elId: user._id }))
          }
        >
          Add as a friend
        </RegularButton>
      )}
      {user._id !== session.user._id && (
        <RegularButton onClick={handleNewChatroom}>Send message</RegularButton>
      )}
      {isInField === "sent_requests" && (
        <RegularButton
          className="red"
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
      {isInField === "received_requests" && (
        <RegularButton
          className="red"
          onClick={() => {
            dispatch(
              removeUserGeneral({
                field: "received_requests",
                elId: user._id,
              })
            );
          }}
        >
          Decline request
        </RegularButton>
      )}
    </>
  );
};
