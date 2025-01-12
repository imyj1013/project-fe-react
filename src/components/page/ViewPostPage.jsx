import React from "react";
import UserInfo from "../ui/UserInfo";
import SearchBar from "../ui/SearchBar";
import styled from "styled-components";
import ContinentButtons from "../ui/ContinentButtons";
import CommentList from "../list/CommentList";
import CommentInput from "../ui/CommentInput";
import ViewPost from "../ui/ViewPost";


const CommentListContainer = styled.div`
    float:center;
    margin-top:50px;
`;

function ViewPostPage(props) {

    return (
        <div>
            <UserInfo/>
            <SearchBar />
            <ContinentButtons />

            <ViewPost ></ViewPost>

            <CommentInput/>

            <CommentListContainer>
                <CommentList />
            </CommentListContainer>
            
        </div>

    );
    
}

export default ViewPostPage;