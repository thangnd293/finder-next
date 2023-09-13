import useStore from "@/store";
import { useEffect } from "react";

const useDetectUserFocusState = () => {
  const setFocused = useStore((state) => state.setFocused);

  useEffect(() => {
    const handleWindowFocus = () => {
      setFocused(true);
    };

    const handleWindowBlur = () => {
      setFocused(false);
    };

    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [setFocused]);
};

export default useDetectUserFocusState;
