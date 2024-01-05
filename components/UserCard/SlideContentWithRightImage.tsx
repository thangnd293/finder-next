import SlideCard from "./SlideCard";

import CustomImage from "@/components/CustomImage";
import Verified from "@/components/Verified";
import { type Image } from "@/service/user";

interface SlideContentWithRightImageProps {
  image?: Image;
  children: React.ReactNode;
}
const SlideContentWithRightImage = ({
  image,
  children,
}: SlideContentWithRightImageProps) => {
  return (
    <SlideCard>
      <div className="relative h-full w-1/2">
        <CustomImage
          className="object-cover object-center"
          image={image}
          alt="SlideContentWithRightImage"
          fill
        />
        <Verified image={image} />
      </div>
      <div className="h-full w-1/2">{children}</div>
    </SlideCard>
  );
};

export default SlideContentWithRightImage;
