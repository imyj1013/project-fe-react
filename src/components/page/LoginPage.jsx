import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Login from '../ui/Login';

const LoginContainer = styled.div`
  margin:100px auto;
  text-align:center;
  padding:50px 30px;
  width:500px;
  border:3px solid #7499F7;
  border-radius:30px;
`;

const HomeButton = styled.button`
  border: none;
  background: none;
  margin:auto;
`;

const HomeImage = styled.img`
  width: 100px;
`;

function LoginPage(props) {
    const navigate = useNavigate();
    

    return(
        <LoginContainer>
            <HomeButton onClick={() => {navigate('/');}}>
            <HomeImage
                src={process.env.PUBLIC_URL + '/toMainPage.png'} 
                alt="메인으로"
            />
            </HomeButton>
            <Login></Login>
        </LoginContainer>
        
    )
}

export default LoginPage;