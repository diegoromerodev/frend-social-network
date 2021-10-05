import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { fetchFeed } from "../../lib/api";
import { setField } from "../slices/realTimeSlice";

export default ({ setUnreadNotifications }) => {
  const session = useSelector((state) => state.session.value);
  const notifications = useSelector((state) => state.realTime.notifications);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      socket.emit("enter", session.user._id);
    });
    socket.on(`message`, () => {
      fetchFeed(session.token, session.user._id, "chatrooms").then((data) => {
        console.log("received message");
        dispatch(setField({ field: "chatrooms", data }));
      });
    });
    socket.on(`notification`, () => {
      console.log("received notification");
      fetchFeed(session.token, session.user._id, "notifications").then(
        (data) => {
          dispatch(setField({ field: "notifications", data }));
        }
      );
    });
    fetchFeed(session.token, session.user._id, "chatrooms").then((data) => {
      dispatch(setField({ field: "chatrooms", data }));
    });
    fetchFeed(session.token, session.user._id, "notifications").then((data) => {
      dispatch(setField({ field: "notifications", data }));
    });
    return () => socket.disconnect();
  }, []);
  useEffect(() => {
    setUnreadNotifications(notifications.filter((el) => !el.read));
  }, [notifications]);
  return <></>;
};
