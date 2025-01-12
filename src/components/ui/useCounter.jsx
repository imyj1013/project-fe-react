import { useState } from "react";
import axios from "axios";

function useCounter(initialValue, idid, type) {
    const [count, setCount] = useState(initialValue);

    const patchLike = async (newCount) => {
        try {
            if (type=="posts") {
                await axios.patch(`http://localhost:3001/posts/${idid}`, { like: newCount });
            }
            else {
                await axios.patch(`http://localhost:3001/comments/${idid}`, { like: newCount });
            }
        } catch (err) {
            console.error("Failed to update like count:", err);
        }
    };

    const increaseCount = () => {
        setCount((prev) => {
            const newCount = prev + 1;
            patchLike(newCount); // 서버에 PATCH 요청
            return newCount;
        });
    };

    const decreaseCount = () => {
        setCount((prev) => {
            const newCount = Math.max(prev - 1, 0);
            patchLike(newCount); // 서버에 PATCH 요청
            return newCount;
        });
    };

    return [count, increaseCount, decreaseCount];
}

export default useCounter;