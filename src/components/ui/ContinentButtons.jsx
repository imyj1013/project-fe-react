import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import useSessionStorage from '../useSessionStorage';

const ContinentContainer = styled.div`
  text-align: center;
  margin: 30px 20%;


  border: 3px dashed #7499F7;
  border-radius: 10px;
  padding: 10px;
`;

const ContinentButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function ContinentButtons (props) {
  const navigate = useNavigate();
  const [continent, setContinent] = useSessionStorage('continent', '아시아');
  const continents = [
    "아시아",
    "유럽",
    "북아메리카",
    "남아메리카",
    "아프리카",
    "오세아니아",
  ];
  return (
      <ContinentContainer>
        {continents.map((continent) => (
          <ContinentButton key={continent} onClick={() => {setContinent(continent); navigate('/'); window.location.reload();}}>{continent}</ContinentButton>
        ))}
      </ContinentContainer>
  );
}

export default ContinentButtons;