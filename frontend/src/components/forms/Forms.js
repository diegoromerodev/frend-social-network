import React from "react";
import { useSelector } from "react-redux";
import GeneralOptions from "../popups/GeneralOptions";
import { FullContFlex } from "../popups/Loading";
import NewPost from "../posts/NewPost";
import EditComment from "./EditComment";
import EditPost from "./EditPost";
import EditProfile from "./EditProfile";

export default ({ setReloadFeed }) => {
  const activeForm = useSelector((state) => state.activeForm.value);
  return (
    <FullContFlex className={activeForm && "active"}>
      {(activeForm === "comment" || activeForm.split("-")[1] === "post") && (
        <NewPost type={activeForm} setReloadFeed={setReloadFeed} />
      )}
      {activeForm === "post-more" && <GeneralOptions />}
      {activeForm === "post-edit" && <EditPost />}
      {activeForm === "comment-edit" && <EditComment />}
      {activeForm === "profile-edit" && <EditProfile />}
    </FullContFlex>
  );
};
