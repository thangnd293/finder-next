import { useCallback, useState } from "react";

export const useDisclosure = (init?: boolean) => {
  const [isOpen, setIsOpen] = useState(init ?? false);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  return {
    isOpen,
    close,
    open,
    toggle,
  };
};
