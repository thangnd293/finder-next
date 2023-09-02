import { useEffect, useRef } from "react";

import { CropImageEvent } from "./crop-image";

export const useEventListener = <
  T extends CropImageEvent,
  Name extends string = T extends `${infer Name}-${string}` ? Name : T,
  CB = (event: CustomEvent<{ [k in Name]: any }>) => void,
>(
  id: string | undefined,
  eventName: T,
  handler: CB,
) => {
  const savedHandler = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = window && window.addEventListener;
    if (!isSupported || !savedHandler || !id) return;
    const eventListener = (event: any) => savedHandler.current?.(event);

    window.addEventListener(`${eventName}-${id}`, eventListener);

    return () => {
      window.removeEventListener(`${eventName}-${id}`, eventListener);
    };
  }, [eventName, id]);
};
