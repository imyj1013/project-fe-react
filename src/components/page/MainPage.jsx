import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import UserInfo from "../ui/UserInfo";
import SearchBar from "../ui/SearchBar";
import ContinentButtons from "../ui/ContinentButtons";
import PostTable from "../list/PostTable";
import useSessionStorage from '../useSessionStorage';

const WriteButton = styled.button`
  font-size: 20px;
  margin: 10px 25.5% 0px 0px;
  float:right;
  background-color: transparent;
  border: 2px solid #7499F7;
  border-radius: 4px;
  cursor: pointer;
  width:100px;
  padding:5px;

  &:hover {
      background-color: #7499F7;
  }
`;


function MainPage(props) {
    const navigate = useNavigate();
    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');
    const [continent, setContinent] = useSessionStorage('continent', '아시아');

    return (
        <div>
            <UserInfo />
            <SearchBar />
            <ContinentButtons />
            
            <PostTable continent={continent}></PostTable>
            <WriteButton onClick={() => {nickname==""? navigate('/log-in') : navigate('/post-write')}}>글 작성</WriteButton>

        </div>

    );

}

export default MainPage;