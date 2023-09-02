import Slider from "./Slider";

import { cn } from "@/lib/utils";
import { type Image, type User } from "@/service/user";
import NextImage from "next/image";
import { PropsWithChildren } from "react";
import { MdLocationOn } from "react-icons/md";
interface UserCardProps extends User {
  isShow?: boolean;
  isFirst?: boolean;
}
const UserCard = ({
  isShow,
  isFirst,
  name,
  age,
  images,
  bio,
  tags,
}: UserCardProps) => {
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
        <div className="h--full flex w-full flex-col items-center justify-center gap-4">
          <p className="font-bold">About {name}</p>

          <p>{bio}</p>
          <div>
            {tags.map((tag) => (
              <span
                key={tag._id}
                className="mr-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700"
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

          <p className="flex items-center gap-1">
            <MdLocationOn size={18} /> Thành phố Hồ Chí Minh, Việt Nam
          </p>
        </div>
      </SlideContentWithRightImage>
    </Slider>
  );
};

export default UserCard;

const SlideCard = ({ children }: PropsWithChildren) => {
  return <div className="flex aspect-[3/2]">{children}</div>;
};

const SlideImages = ({ images }: { images: [Image, Image] }) => {
  return (
    <SlideCard>
      {images.map((image, i) => (
        <div key={i} className="relative h-full w-1/2">
          <NextImage
            key={i}
            className="object-cover object-center"
            src={image.url}
            alt=""
            fill
          />
        </div>
      ))}
    </SlideCard>
  );
};

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
        <NextImage
          className="object-cover object-center"
          src={image?.url ?? ""}
          alt=""
          fill
        />
      </div>
      <div className="h-full w-1/2">{children}</div>
    </SlideCard>
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
