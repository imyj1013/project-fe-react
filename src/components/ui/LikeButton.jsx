import React, { useState } from "react";
import useCounter from "./useCounter";
import styled from "styled-components";

const Likeimg = styled.img`
    width: 20px;
`;

const LikeCount = styled.button`
    font-size: 30px;
    border: none;
    background-color: transparent;
`;

function LikeButton({ count: initialCount, idid, setCount, type}) {
    const [Like, setLike] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(initialCount, idid, type);

    const handleLike = () => {
        setLike((prevLike) => !prevLike);
        Like ? decreaseCount() : increaseCount();
        setCount(count);
    };

    return (
        <LikeCount onClick={handleLike}>
            <Likeimg src={process.env.PUBLIC_URL + "/likeButton.png"} alt="좋아요" /> {count}
        </LikeCount>
    );
}

export default LikeButton;