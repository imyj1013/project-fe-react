import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostTableItem from './PostTableItem';
import axios from 'axios';
import useSessionStorage from '../useSessionStorage';

const PostTableContainer = styled.table`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-collapse:collapse;
    width:50%;
    margin: 0px auto;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

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

const EmptyTd = styled.td`
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    padding: 10px;
    height: 100px;
    color: #999;
    width:950px;
`;

function PostTable(props) {

    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/posts');
                const fetchedPosts = response.data;
                const matchedPost = fetchedPosts.filter((item) => item.continent === props.continent);
                setPosts(matchedPost);
            } catch (err) {
                console.error(err);
            }
        };
        fetchComments();
    }, [props.continent]);

    return (
        <PostTableContainer>
            <thead>
                <BorderTr>
                    <NumberTd>번호</NumberTd><TitleTd>제목</TitleTd><NicknameTd>작성자</NicknameTd>
                </BorderTr>
            </thead>
            <tbody>
                {posts.map((post,index) => {
                    return (
                        <PostTableItem key={post.post_number} count={index + 1} post={post} />
                    );
                })}
                {posts.length == 0 && (<BorderTr><EmptyTd colSpan={3}>게시글이 없습니다.</EmptyTd></BorderTr>)}
            </tbody>
        </PostTableContainer>
    );
}

export default PostTable;