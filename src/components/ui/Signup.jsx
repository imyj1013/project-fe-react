import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

const SignupLabel = styled.label`
    font-size:30px;
    color:#7499F7;
`;

const InputContainer = styled.div`
    margin:20px;
`;

const Buttons = styled.button`
    font-size:20px;
    border: 2px solid #7499F7;
    border-radius: 10px;
    background-color: aliceblue;

    &:hover {
        background-color: #7499F7;
    }
`;

const IDInput = styled.input`
    font-size:20px;
    height: 30px;
    padding-left:10px;
    border-radius:10px;
    border:none;
    background-color:lightgrey;
`;

function Signup() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 사용자 추가 로직
    const newUser = { id, password, nickname };

    const addcomment = async () => {
      try {
          // axios를 이용해 JSON 서버로 POST 요청
          await axios.post("http://localhost:8080/user", newUser);
          setNickname("");
          setId("");
          setNickname("");
          setConfirmPassword("");
          navigate("/"); // 게시글 페이지로 이동
      } catch (error) {
          console.error("댓글 저장 중 오류 발생:", error);
      }
    };
    addcomment();

    alert("회원가입이 완료되었습니다.");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <IDInput type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
      </InputContainer>

      <InputContainer>
        <IDInput type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      </InputContainer>

      <InputContainer>
        <IDInput type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      </InputContainer>

      <InputContainer>
        <IDInput type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </InputContainer>

      <Buttons type="submit">회원가입</Buttons>
      &nbsp;&nbsp;&nbsp;
      <SignupLabel>|&nbsp;</SignupLabel>
      <Buttons type="button" onClick={() => navigate("/")}>취소</Buttons>
    </form>
  );
}

export default Signup;
