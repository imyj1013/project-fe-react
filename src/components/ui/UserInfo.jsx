import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import useSessionStorage from '../useSessionStorage';

const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10%;
  background-color:#7499F7;
`;

const UserDiv = styled.div`
  text-align: right;
  margin-right: 30px;
`;

const LogoutButton = styled.button`
  font-size: 16px;
`;

function UserInfo(props) {
  const navigate = useNavigate();
  const [id, setId] = useSessionStorage('id', '');
  const [nickname, setNickname] = useSessionStorage('nickname', '');

  const changebutton = () => {
    if (nickname=="") {
      navigate('/log-in');
    }
    else {
      setId("");
      setNickname(""); 
      console.log(id);
      console.log(nickname);
      window.location.replace("/")
      console.log(id);
      console.log(nickname);
    }
    
  }

  return (
    <UserContainer>
      <UserDiv>{nickname!="" && nickname+" 님"}</UserDiv>
      <LogoutButton onClick={changebutton}>{nickname==""&&"로그인"}{nickname!=""&&"로그아웃"}</LogoutButton>
    </UserContainer>
  );
  
}

export default UserInfo;