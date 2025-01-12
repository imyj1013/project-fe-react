import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentListItem from './CommentListItem';
import axios from 'axios';
import useSessionStorage from '../useSessionStorage';

const CommentListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function CommentList(props) {

    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/comments');
                const fetchedPosts = response.data;
                const matchedPost = fetchedPosts.filter((item) => item.post_number === post_number);
                setComments(matchedPost);
            } catch (err) {
                console.error(err);
            }
        };
        fetchComments();
    }, [post_number]);

    return (
        <CommentListContainer>
            {comments.map((comment) => {
                return (
                    <CommentListItem
                        key={comment.comment_id}
                        comment={comment}
                    />
                );
            })}
        </CommentListContainer>
    );
}

export default CommentList;