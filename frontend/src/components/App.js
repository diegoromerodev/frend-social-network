import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import FacebookLogin from "react-facebook-login";

export default () => {
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      socket.emit("enter", "tempUserID");
    });
    socket.on("message", (messageObj) => {
      console.log("received");
      setMessages((prevState) => [messageObj, ...prevState]);
    });
    socket.on("notification", (notiObj) => {
      setNotifications((prevState) => [notiObj, ...prevState]);
    });
    return () => socket.disconnect();
  });
  const handleClick = (res) => {
    console.log(res);
  };
  return (
    <div>
      {!!notifications.length && (
        <ul>
          <li>
            <h4>NOTIFICATIONS</h4>
          </li>
          {notifications.map((noti) => (
            <li key={noti}>{noti}</li>
          ))}
        </ul>
      )}
      {!!messages.length && (
        <ul>
          <li>
            <h2>MESSAGES</h2>
          </li>
          {messages.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}
      <FacebookLogin
        appId="1474724352891583"
        fields="first_name,last_name,birthday,email,picture"
        callback={handleClick}
      />
    </div>
  );
};
