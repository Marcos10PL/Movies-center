import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  
  const [val, setVal] = useState(() => 
  {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [val]);

  return [val, setVal];
}

export default useLocalStorage;