import React, {useState, useEffect} from "react";
import styled from "styled-components";
import LikeButton from "../ui/LikeButton";
import useSessionStorage from '../useSessionStorage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 

const TitleContainer = styled.div`
    padding: 8px 16px;
    margin: 30px 25%;
`;

const ContentContainer = styled.div`
    padding: 8px 16px;    
    margin: 30px 27%;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
    padding:0px 50px;
    display:inline-block;
`;

const InfoText = styled.p`
    float:right;
    font-size: 16px;
    line-height: 32px;
    white-space: pre-wrap;
    padding:30px 20px;
    display:inline-block;
`;

const Line = styled.hr`
    border: 1px solid #7499F7;
    width: calc(50% - 20px);

`;

const ContentText = styled.p`
    font-size: 16px;
    line-height: 32px;
    white-space: pre-wrap;
    padding:0px 50px;
    display:inline-block;
`;

const LikebuttonSection = styled.div`
    text-align:center;
`;

const ButtonContainer = styled.div`
    padding: 8px 16px;
    margin: 0px 25%;
    float:right;
    border:1px solid black;
`;

const LoadingDiv = styled.div`
text-align:center;
`;

const SubmitButtonStyled = styled.button`
    border: 2px solid #7499F7;
    border-radius: 5px;
    background-color: aliceblue;
    padding:5px;

    &:hover {
        background-color: #7499F7;
    }
`;

function ViewPost(props) {
    const navigate = useNavigate();

    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');

    const [post, setPost] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get("http://localhost:3001/posts");
                const fetchedPosts = response.data;
                const matchedPost = fetchedPosts.find((item) => item.post_number === post_number);
                setPost(matchedPost);
                if (matchedPost) setCount(matchedPost.like);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPost();
    }, [post_number]);

    //const post = Data.posts.find((item) => item.post_number === parseInt(1));

    const editPost = () => {
        if (post.nickname === nickname) {
            navigate("/post-edit");
        } else {
            alert("게시글은 작성자만 수정할 수 있습니다.");
        }
    };

    const deletePost = async () => {
        if (post.nickname === nickname) {
            if (window.confirm("게시글을 삭제하시겠습니까?")) {
                try {
                    await axios.delete(`http://localhost:3001/posts/${post.id}`);
                    navigate("/");
                } catch (err) {
                    console.error("Error while deleting post:", err);
                }
            }
        } else {
            alert("게시글은 작성자만 삭제할 수 있습니다.");
        }
    };

    if (!post) {
        return navigate('/');
    }

    const editDate = (dateString) => {
        let date = new Date(dateString);
        let kstDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
        let formattedDate = kstDate.toISOString().slice(0, 19).replace("T", " ");
        return formattedDate;

    }

    return (
        <div>
            <TitleContainer>
                <TitleText>{post.title}</TitleText>
                <InfoText><SubmitButtonStyled onClick={editPost}>수정</SubmitButtonStyled>&nbsp;<SubmitButtonStyled onClick={deletePost}>삭제</SubmitButtonStyled></InfoText>
                <InfoText>{post.nickname}</InfoText>
                <InfoText>{editDate(post.date)}</InfoText>
            </TitleContainer>

            <Line></Line>

            <ContentContainer>
                <ContentText>{post.content}</ContentText>
                <hr></hr>
                <LikebuttonSection><LikeButton count={count} setCount={setCount} idid={post.id} type="posts"></LikeButton></LikebuttonSection>
            </ContentContainer> 
        </div>
    );
}

export default ViewPost;