import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import useSessionStorage from '../useSessionStorage';

const SearchSection = styled.div`
  text-align: center;
  padding: 40px;
`;

const HomeButton = styled.button`
  display: inline;
  background: none;
  margin-right: 50px;
  border:none;
`;

const HomeImage = styled.img`
  width: 50px;
`;

const SearchForm = styled.form`
  display: inline-flex;
  align-items: center;
  border: 3px solid #7499F7;
  border-radius: 50px;
  width: 700px;
`;

const SearchInput = styled.input`
  width: 590px;
  height: 60px;
  font-size: 30px;
  border: none;
  outline: none;
  margin-left:30px;
`;

const SearchButton = styled.button`
  border: none;
  background: none;
`;

const SearchIcon = styled.img`
  width: 50px;
`;

function SearchBar(props) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [continent, setContinent] = useSessionStorage('continent', '아시아');
  
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    if (keyword==""){
        alert("검색어를 입력하세요");
    }
    else {
      navigate('/');
    }
    
};
  
  return (
    <SearchSection>
        <HomeButton onClick={() => {setContinent('아시아'); navigate('/'); window.location.reload();}}>
        <HomeImage
            src={process.env.PUBLIC_URL + '/toMainPage.png'} 
            alt="메인으로"
        />
        </HomeButton>
        <SearchForm onSubmit={handleSubmit}>
        <SearchInput type="text" id="search" name="search" value={keyword} onChange={handleChange} placeholder="검색어를 입력하세요"/>
        <SearchButton type="submit">
            <SearchIcon
                src={process.env.PUBLIC_URL + '/searchButton.png'} 
                alt="검색"
            />
        </SearchButton>
        </SearchForm>
    </SearchSection>
  );
    
  
}

export default SearchBar;