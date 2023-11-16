import SlideCard from "./SlideCard";

import CustomImage from "@/components/CustomImage";
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
        {image?.isVerifiedSuccess && (
          <img
            className="absolute bottom-[1px] right-[1px] w-[50%] object-cover"
            src="/images/verified.jpg"
          />
        )}
      </div>
      <div className="h-full w-1/2">{children}</div>
    </SlideCard>
  );
};

export default SlideContentWithRightImage;
