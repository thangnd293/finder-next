import { useCallback, useEffect, useRef, useState } from "react";

type DebouncedFunction<T extends any[]> = (...args: T) => void;

const useDebouncedFunction = <T extends any[]>(
  callback: DebouncedFunction<T>,
  delay: number,
  deps: any[] = [],
): DebouncedFunction<T> => {
  const timerId = useRef<NodeJS.Timeout>();
  const [canCall, setCanCall] = useState(true);

  useEffect(() => {
    if (canCall) {
      return;
    }

    timerId.current = setTimeout(() => {
      setCanCall(true);
    }, delay);

    return () => {
      clearTimeout(timerId.current);
    };
  }, [canCall, delay, ...deps]);

  const debouncedFunction: DebouncedFunction<T> = useCallback(
    (...args) => {
      if (canCall) {
        callback(...args);

        setCanCall(false);
      }
    },
    [callback, canCall],
  );

  return debouncedFunction;
};

export default useDebouncedFunction;
