import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { sendData } from "../lib/api";
import ChatMessages from "./ChatMessages";
import { MessageContainer, UserChatButton } from "./utilities/chatElements";
import {
  FormFlexContainer,
  RegularButton,
  RoundedInputField,
} from "./utilities/FormElements";
import { PostWrapper } from "./utilities/postElements";
import { FlexContainer } from "./utilities/SpaceContainers";

export default () => {
  const allUsersChats = useRef(null);
  const chatBox = useRef(null);
  const chatrooms = useSelector((state) => state.realTime.chatrooms);
  const [currentChatroom, setCurrentChatroom] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(chatrooms[0]?._id);
  const [recipient, setRecipient] = useState({});
  const session = useSelector((state) => state.session.value);
  useEffect(() => {
    setCurrentChatroom(chatrooms.find((chat) => chat._id === currentChatId));
    chatBox.current.scroll(0, chatBox.current.scrollHeight);
  });
  useEffect(() => {
    allUsersChats.current.scroll({
      left: 100,
      behavior: "smooth",
    });
  }, []);
  const handleSendMessage = (e) => {
    const url = `https://frends-social.herokuapp.com/users/${session.user._id}/chatrooms/${currentChatId}/messages`;
    sendData("post", url, session.token, e);
    document.querySelector('input[name="text"]').value = "";
  };
  return (
    <PostWrapper>
      <FlexContainer ref={allUsersChats} className="scroll-x">
        {chatrooms?.map((chat) => (
          <UserChatButton
            chat={chat}
            currChat={currentChatId}
            setCurrentChatId={setCurrentChatId}
            session={session}
            setRecipient={setRecipient}
          />
        ))}
      </FlexContainer>
      <MessageContainer ref={chatBox}>
        {currentChatroom?.messages?.map((msg) => (
          <ChatMessages msg={msg} session={session} />
        ))}
      </MessageContainer>
      <FormFlexContainer onSubmit={handleSendMessage}>
        <RoundedInputField
          name="text"
          placeholder={`Write a new message for ${recipient.first_name}`}
        />
        <input type="text" hidden name="recipient" value={recipient.id} />
        <RegularButton className="blue">Send Message</RegularButton>
      </FormFlexContainer>
    </PostWrapper>
  );
};
