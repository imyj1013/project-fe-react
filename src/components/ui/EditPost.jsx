import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useSessionStorage from '../useSessionStorage';


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
`;

function EditPost() {
  const navigate = useNavigate();
  const [id, setId] = useSessionStorage('id', '');
  const [nickname, setNickname] = useSessionStorage('nickname', '');
  const [post_number, setPost_number] = useSessionStorage('post_number', '');

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [continent, setContinent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        const fetchedPosts = response.data;
        const matchedPost = fetchedPosts.find(
          (item) => item.post_number === post_number
        );
        setPost(matchedPost);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [post_number]);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setContinent(post.continent || "");
    }
  }, [post]);

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
    event.preventDefault();

    if (title === "") {
      alert("제목을 입력하세요");
      return;
    }
    if (content === "") {
      alert("본문을 입력하세요");
      return;
    }

    const updatedPost = {
      title,
      content,
      date: new Date().toISOString(),
      continent,
    };

    const updatePost = async () => {
      try {
        await axios.patch(`http://localhost:8080/posts/${post.id}`,
          updatedPost
        );
        navigate("/"); // 게시글 페이지로 이동
      } catch (error) {
        console.error("게시글 수정 중 오류 발생:", error);
      }
    };
    updatePost();
  };

  if (!post) {
    return <div>로딩 중...</div>; // 데이터를 로드하는 동안 표시
  }

  return (
    <form onSubmit={handleSubmit}>
      <TitleSection>
        <TitleLabel htmlFor="post-title">제목</TitleLabel>
        <TitleInputField
          type="text"
          id="post-title"
          name="post-title"
          value={title}
          onChange={handleChangeTitle}
        />
      </TitleSection>

      <RadioSection>
        {continents.map((continentOption) => (
          <RadioLabel key={continentOption}>
            <input
              type="radio"
              name="continent"
              value={continentOption}
              checked={continent === continentOption}
              onChange={handleChangeContinent}
            />
            {continentOption}
          </RadioLabel>
        ))}
      </RadioSection>

      <ContentSection>
        <ContentLabel htmlFor="post-content">본문</ContentLabel>
        <ContentInputField
          id="post-content"
          name="post-content"
          value={content}
          onChange={handleChangeContent}
        />
      </ContentSection>

      <SubmitSection>
        <SubmitButtonStyled type="submit">글 수정하기</SubmitButtonStyled>
      </SubmitSection>
    </form>
  );
}

export default EditPost;