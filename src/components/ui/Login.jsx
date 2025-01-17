import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import useSessionStorage from '../useSessionStorage';
import axios from 'axios';

const Loginlabel = styled.label`
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

function Login(props) {
    const navigate = useNavigate();
    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');

    const [inputId, setinputId] = useState("");
    const [inputPassword, setinputPassword] = useState("");

    const [users, setUsers] = useState([]);
        
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user');
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);
   

    const handleChangeId = (event) => {
        setinputId(event.target.value);
    };

    const handleChangePassword = (event) => {
        setinputPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        const user = users.find((user) => user.id === inputId && user.password === inputPassword);

        if (user) {
            setId(user.id);
            setNickname(user.nickname);
            console.log(id);
            console.log(nickname);
            navigate("/");
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            
            <InputContainer>
            <IDInput type="text" id="user-id" name="user-id" placeholder="ID" value={inputId} onChange={handleChangeId} />
            </InputContainer>

            <InputContainer>
            <IDInput type="password" id="user-password" name="user-password" placeholder="PASSWORD" value={inputPassword} onChange={handleChangePassword} />
            </InputContainer>

            <br />
            <Buttons type="submit">로그인</Buttons>&nbsp;&nbsp;&nbsp;
            <Loginlabel>|&nbsp;</Loginlabel>
            <Buttons type="button" onClick={() => {navigate('/sign-up');}}>회원가입</Buttons>
            
            
        </form>
    );
}

export default Login;