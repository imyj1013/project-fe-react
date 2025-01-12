import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import UserInfo from "../ui/UserInfo";
import SearchBar from "../ui/SearchBar";
import ContinentButtons from "../ui/ContinentButtons";
import useSessionStorage from '../useSessionStorage';

const WriteButton = styled.button`
  font-size: 16px;
`;

const ViewButton = styled.button`
  font-size: 16px;
`;

function MainPage(props) {
    const navigate = useNavigate();
    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');

    return (
        <div>
            <UserInfo />
            <SearchBar />
            <ContinentButtons />
            <WriteButton onClick={() => {nickname==""? navigate('/log-in') : navigate('/post-write')}}>글쓰기</WriteButton>
            <ViewButton onClick={() => {setPost_number(4); navigate('/post-view');}}>글보기</ViewButton>

        </div>

    );

}

export default MainPage;