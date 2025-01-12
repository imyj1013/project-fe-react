import React, {useState} from "react";
import styled from "styled-components";
import LikeButton from "../ui/LikeButton";
import axios from "axios";
import useSessionStorage from '../useSessionStorage';
import { useNavigate } from 'react-router-dom';

const CommentListItemContainer = styled.div`
    width: calc(46% - 32px);
    padding: 16px;
    border: 2px solid #7499F7;
    border-radius: 8px;
    cursor: pointer;
    margin: 10px 27%;
    background:aliceblue;
`;

const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;

const BorderTd = styled.td`
    border-bottom:2px solid #7499F7;
`;

const Input = styled.textarea`
    width: calc(100% - 16px);
    padding: 8px;
    font-size: 16px;
    margin-top: 8px;
    
    border: 1px solid gray;

`;

const Button = styled.button`
    margin: 8px 2px;
    padding: 8px 16px;
    background-color: #7499f7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float:right;

    &:hover {
        background-color: #5672d4;
    }
`;


function CommentListItem(props) {
    const { comment } = props;
    const navigate = useNavigate();
    const [count, setCount] = useState(comment.like);
    
    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');

    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    const [editedComment, setEditedComment] = useState(comment.comment); // 수정 중인 댓글

    // 수정 모드 전환
    const toggleEdit = () => {
        if (comment.nickname === nickname) {
            setIsEditing(true);
        } else {
            alert("댓글은 작성자만 수정할 수 있습니다.");
        }
    };

    // 수정 완료
    const saveEdit = () => {
        axios
            .put(`http://localhost:3001/comments/${comment.id}`, {
                ...comment,
                comment: editedComment,
            })
            .then(() => {
                setIsEditing(false); // 수정 모드 종료
                alert("댓글이 수정되었습니다.");
            })
            .catch((error) => {
                console.error("Error updating comment:", error);
                alert("댓글 수정 중 오류가 발생했습니다.");
            });
    };

    // 수정 취소
    const cancelEdit = () => {
        setEditedComment(comment.comment); // 변경된 내용 취소
        setIsEditing(false); // 수정 모드 종료
    };

    const deleteComment = () => {
        if (comment.nickname == nickname) {
            if (window.confirm("댓글을 삭제하시겠습니까?")) {
                axios.delete(`http://localhost:3001/comments/${comment.id}`);
                navigate('/post-view');
            }
        }
        else {
            alert("댓글은 작성자만 삭제할 수 있습니다.");
        }

    }

    const editDate = (dateString) => {
        let date = new Date(dateString);
        let kstDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
        let formattedDate = kstDate.toISOString().slice(0, 19).replace("T", " ");
        return formattedDate;

    }

    return (
        <CommentListItemContainer>
            {isEditing ? (
                <>
                    <Input
                        type="text"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <div>
                        <Button onClick={cancelEdit}>취소</Button>
                        <Button onClick={saveEdit}>수정 완료</Button>
                    </div>
                </>
            ) : (
                <table width="100%">
                    <tbody>
                        <tr>
                            <BorderTd width="40%">
                                <ContentText>{comment.nickname}</ContentText>
                            </BorderTd>
                            <BorderTd>
                                <ContentText>{editDate(comment.date)}</ContentText>
                            </BorderTd>
                            <BorderTd width="10%">
                                <LikeButton count={count} setCount={setCount} idid={comment.id} type="comments"></LikeButton>
                            </BorderTd>
                            <BorderTd width="10%" onClick={toggleEdit}>
                                <Button>수정</Button>
                            </BorderTd>
                            <BorderTd width="10%" onClick={deleteComment}>
                                <Button>삭제</Button>
                            </BorderTd>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                <ContentText>{comment.comment}</ContentText>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </CommentListItemContainer>
    );
}

export default CommentListItem;