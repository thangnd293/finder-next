import { PropsWithChildren } from "react";

const SlideCard = ({ children }: PropsWithChildren) => {
  return <div className="flex aspect-card">{children}</div>;
};

export default SlideCard;
