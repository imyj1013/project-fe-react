import React from "react";
import UserInfo from "../ui/UserInfo";
import SearchBar from "../ui/SearchBar";
import ContinentButtons from "../ui/ContinentButtons";
import EditPost from "../ui/EditPost";

function EditPostPage(props) {
  return (
    <div>
      <UserInfo />
      <SearchBar />
      <ContinentButtons />
      <EditPost />
    </div>
  );
}

export default EditPostPage;