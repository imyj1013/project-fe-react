import { useState } from 'react';

// sessionStorage를 사용하는 커스텀 훅
function useSessionStorage(key, initialValue) {
  // sessionStorage에서 값 읽어오기
  const storedValue = sessionStorage.getItem(key);
  
  // sessionStorage에 저장된 값이 있으면 파싱하여 사용하고, 없으면 초기값 사용
  const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

  // 값이 변경될 때마다 sessionStorage에 저장
  const setStoredValue = (newValue) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue)); // JSON 문자열로 변환하여 저장
  };

  return [value, setStoredValue];
}

export default useSessionStorage;