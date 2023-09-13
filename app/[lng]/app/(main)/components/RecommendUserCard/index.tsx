import Slider from "./Slider";

import { cn } from "@/lib/utils";
import { type Image, type User } from "@/service/user";
import { MdLocationOn } from "react-icons/md";
import SlideCard from "./SlideCard";
import SlideContentWithRightImage from "./SlideContentWithRightImage";
import SlideImages from "./SlideImages";
interface RecommendUserCardProps extends User {
  isShow?: boolean;
  isFirst?: boolean;
}

export const RecommendUserCard = ({
  isShow,
  isFirst,
  name,
  age,
  images,
  bio,
  tags,
}: RecommendUserCardProps) => {
  const { firstImage, lastImage, imageSlides } = getImageData(images);

  return (
    <Slider
      className={cn("absolute flex h-full w-full", {
        "z-10": isShow,
      })}
      style={{
        animation: !isShow && isFirst ? `fadeOut 0.8s` : undefined,
      }}
      isShow={isShow}
    >
      <SlideContentWithRightImage image={firstImage}>
        <div className="flex h-full w-full flex-col justify-center p-8">
          <p className="text-2xl font-extrabold text-gray-700">
            {name}, {age}
          </p>
        </div>
      </SlideContentWithRightImage>

      <SlideCard>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-2">
          <p className="font-bold">About {name}</p>

          {bio && <p>{bio}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag._id}
                className="rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </SlideCard>

      {imageSlides.length > 0 &&
        imageSlides.map((images, i) => <SlideImages key={i} images={images} />)}

      <SlideContentWithRightImage image={lastImage}>
        <div className="flex h-full w-full flex-col justify-center p-8">
          <p className="text-2xl font-extrabold text-gray-700">
            {name}&apos;s location
          </p>

          <p>
            <MdLocationOn className="mb-1 inline-block" size={18} />
            Thành phố Hồ Chí Minh, Việt Nam
          </p>
        </div>
      </SlideContentWithRightImage>
    </Slider>
  );
};

const getImageData = (images: Image[]) => {
  const _images = [...images];

  const firstImage = _images.shift();
  const lastImage = _images.length % 2 === 0 ? firstImage : _images.pop();

  const imageSlides: [Image, Image][] = _images.reduce(
    (acc, _, i, arr) => {
      if (i % 2 === 0) {
        return [...acc, [arr[i], arr[i + 1]]];
      }

      return acc;
    },
    [] as [Image, Image][],
  );

  return {
    firstImage,
    lastImage,
    imageSlides,
  };
};
