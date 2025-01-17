import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import useSessionStorage from '../useSessionStorage';
import { useNavigate } from 'react-router-dom';

const BorderTr = styled.tr`
    border-bottom:2px solid #7499F7;
`;

const NumberTd = styled.td`
    font-size:20px;
    width:130px;
    text-align:center;
    padding: 10px;
`;

const TitleTd = styled.td`
    font-size:20px;
    width:550px;
    padding: 10px;
`;

const NicknameTd = styled.td`
    font-size:20px;
    width:200px;
    padding: 10px;
`;

const ViewButton = styled.button`
    font-size: 18px;
    border:none;
    background-color:transparent;
    padding:0px;

    &:hover {
        color: #5672d4;
    }
`;

function PostTableItem(props) {
    const navigate = useNavigate();
    
    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');



    return (
        <BorderTr>
            <NumberTd>{props.count}</NumberTd><TitleTd><ViewButton onClick={() => {setPost_number(props.post.post_number); navigate('/post-view');}}>{props.post.title}</ViewButton></TitleTd><NicknameTd>{props.post.nickname}</NicknameTd>
        </BorderTr>
    );
}

export default PostTableItem;