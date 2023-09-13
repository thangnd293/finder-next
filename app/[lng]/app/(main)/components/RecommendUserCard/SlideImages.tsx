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
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </SlideCard>
  );
};

export default SlideImages;
