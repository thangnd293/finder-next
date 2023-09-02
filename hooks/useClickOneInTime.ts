import { useRef } from "react";

const useClickOneInTime = (callback: () => void, time: number) => {
  const shouldClick = useRef(true);

  const click = () => {
    if (shouldClick.current) {
      callback();
      shouldClick.current = false;
      setTimeout(() => {
        shouldClick.current = true;
      }, time);
    }
  };

  return click;
};

export default useClickOneInTime;
