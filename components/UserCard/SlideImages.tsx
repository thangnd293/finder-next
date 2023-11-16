import SlideCard from "./SlideCard";

import CustomImage from "@/components/CustomImage";
import { type Image } from "@/service/user";

interface SlideImagesProps {
  images: [Image, Image];
}

const SlideImages = ({ images }: SlideImagesProps) => {
  return (
    <SlideCard>
      {images.map((image, i) => (
        <div key={i} className="relative h-full w-1/2">
          <CustomImage
            className="object-cover object-center"
            image={image}
            alt="SlideImages"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {image?.isVerifiedSuccess && (
            <img
              className="absolute bottom-[1px] right-[1px] w-[50%] object-cover"
              src="/images/verified.jpg"
            />
          )}
        </div>
      ))}
    </SlideCard>
  );
};

export default SlideImages;
