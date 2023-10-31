import { useMediaQuery } from "usehooks-ts";

export const useIsMobile = () => {
  const isMobileView = useMediaQuery("(max-width: 768px)");

  return isMobileView;
};
