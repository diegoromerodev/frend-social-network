import React from "react";
import { useSelector } from "react-redux";
import { FullContFlex } from "../popups/Loading";
import NewPost from "../posts/NewPost";

export default () => {
  const activeForm = useSelector((state) => state.activeForm.value);
  return (
    <FullContFlex className={activeForm && "active"}>
      {activeForm === "comment" ||
        (activeForm.split("-").includes("post") && (
          <NewPost type={activeForm} />
        ))}
    </FullContFlex>
  );
};
