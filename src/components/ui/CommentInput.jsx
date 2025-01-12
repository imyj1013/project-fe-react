import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import useSessionStorage from '../useSessionStorage';
import axios from 'axios';

const StyledTextarea = styled.textarea`
    width: calc(46% - 32px);
    padding: 14px;
    font-size: 16px;
    line-height: 20px;
    margin: 20px 27% 10px 27%;
`;

const CommentButton = styled.button`
    float:right;
    margin-right: 27%;
    border: 2px solid #7499F7;
    border-radius: 5px;
    background-color: aliceblue;
    padding:5px;

    &:hover {
        background-color: #7499F7;
    }
`;


function CommentInput(props) {
    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');
    const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const [commentsforcount, setCommentsforcount] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/comments');
                setCommentsforcount(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchComments();
    }, [post_number]);

    const len = commentsforcount.length;

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        if (nickname=="") {
            alert("댓글을 작성하려면 로그인 해주세요.");
            navigate('/log-in');
        }
        else {
            event.preventDefault();
    
            if (!comment.trim()) {
                alert("댓글을 입력해주세요.");
                return;
            }
    
            const newComment = {
                comment_id: (parseInt(len)+1),
                post_number: post_number,
                comment: comment,
                nickname: nickname, // 사용자 닉네임
                date: new Date().toISOString(), // 현재 시간 저장
                like: 0, // 좋아요 초기값
            };


            const addcomment = async () => {
                try {
                    // axios를 이용해 JSON 서버로 POST 요청
                    await axios.post("http://localhost:3001/comments", newComment);
                    alert("댓글이 저장되었습니다.");
                    setComment(""); // 입력 필드 초기화
                    navigate("/post-view"); // 게시글 페이지로 이동
                } catch (error) {
                    console.error("댓글 저장 중 오류 발생:", error);
                }
            };
            addcomment();

        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} action="" method="" >
                <StyledTextarea id="comment" name="comment" value={comment} onChange={handleChange} placeholder="댓글을 입력하세요"/>
                <CommentButton type="submit" >댓글 작성하기</CommentButton>
            </form>
        </div>

    );
}


export default CommentInput;