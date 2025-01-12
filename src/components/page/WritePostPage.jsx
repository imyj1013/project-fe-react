import React from "react";
import UserInfo from "../ui/UserInfo";
import SearchBar from "../ui/SearchBar";
import ContinentButtons from "../ui/ContinentButtons";
import WritePost from "../ui/WritePost";

function WritePostPage(props) {
  return (
    <div>
      <UserInfo />
      <SearchBar />
      <ContinentButtons />
      <WritePost />
    </div>
  );
}

export default WritePostPage;