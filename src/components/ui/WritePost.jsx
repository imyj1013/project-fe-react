import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import useSessionStorage from '../useSessionStorage';
import axios from 'axios';

const TitleSection = styled.div`
  text-align: center;
  padding: 30px 20%;
`;

const TitleLabel = styled.label`
  display: inline-block;
  margin-right: 50px;
  font-size: 20px;
  font-weight: bold;
`;

const TitleInputField = styled.input`
  display: inline-block;
  width: 800px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
  border:2px solid #7499F7;
  :focus {
    outline:none;
  }

`;

const RadioSection = styled.div`
  text-align: center;
  padding: 30px 20%;
`;

const RadioLabel = styled.label`
  margin-left: 50px;
  font-size: 16px;
  font-weight: bold;
`;

const ContentSection = styled.div`
  text-align: center;
  padding: 30px 20%;
`;

const ContentLabel = styled.label`
  display: inline-block;
  margin-right: 50px;
  font-size: 20px;
  font-weight: bold;
  vertical-align: top;
`;

const ContentInputField = styled.textarea`
  display: inline-block;
  width: 800px;
  height: 500px;
  font-size: 20px;
  border-radius: 10px;
  border:2px solid #7499F7;
  :focus {
    outline:none;
  }
`;

const SubmitSection = styled.div`
  text-align: center;
  padding: 20px;
`;

const SubmitButtonStyled = styled.button`
    font-size:20px;
    border: 2px solid #7499F7;
    border-radius: 10px;
    background-color: aliceblue;

    &:hover {
        background-color: #7499F7;
    }
`;

function WritePost(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [continent, setContinent] = useState("아시아");
    const [id, setId] = useSessionStorage('id', '');
    const [nickname, setNickname] = useSessionStorage('nickname', '');
    const [post_number, setPost_number] = useSessionStorage('post_number', '');

    const [postsforcount, setPostsforcount] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/posts');
                setPostsforcount(response.data[response.data.length - 1]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, [post_number]);

    const num = postsforcount.post_number;
    
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    
    const handleChangeContent = (event) => {
        setContent(event.target.value);
    };

    const handleChangeContinent = (event) => {
      setContinent(event.target.value);
    };

    const continents = [
        "아시아",
        "유럽",
        "북아메리카",
        "남아메리카",
        "아프리카",
        "오세아니아",
    ];

    const handleSubmit = (event) => {
        if (title==""){
            alert("제목을 입력하세요");
            event.preventDefault();
        }
        else if (content==""){
            alert("본문을 입력하세요");
            event.preventDefault();
        }
        else {
            event.preventDefault();

            const newPost = {
              post_number: (parseInt(num)+1),
              title: title,
              nickname: nickname, // 사용자 닉네임
              content: content,
              date: new Date().toISOString(), // 현재 시간 저장
              continent: continent,
              like: 0, // 좋아요 초기값
            };


            const addcomment = async () => {
                try {
                    // axios를 이용해 JSON 서버로 POST 요청
                    await axios.post("http://localhost:3001/posts", newPost);
                    setTitle("");
                    setContent("");
                    navigate("/"); // 게시글 페이지로 이동
                } catch (error) {
                    console.error("댓글 저장 중 오류 발생:", error);
                }
            };
            addcomment();
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <TitleSection>
                <TitleLabel htmlFor="post-title">제목</TitleLabel>
                    <TitleInputField type="text" id="post-title" name="post-title" value={title} onChange={handleChangeTitle}/>
            </TitleSection>

            <RadioSection>
                {continents.map((continent) => (
                    <RadioLabel key={continent}>
                        <input type="radio" name="continent" value={continent} defaultChecked={continent === "아시아"} onChange={handleChangeContinent}/> {continent}
                    </RadioLabel>
                ))}
            </RadioSection>

            <ContentSection>
                <ContentLabel htmlFor="post-content">본문</ContentLabel>
                    <ContentInputField type="text" id="post-content" name="post-content" value={content} onChange={handleChangeContent}/>
            </ContentSection>

            <SubmitSection>
                <SubmitButtonStyled type="submit">글 작성하기</SubmitButtonStyled>
            </SubmitSection>
        </form>

    );
  
}

export default WritePost;