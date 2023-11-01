import Slider from "./Slider";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { type Image, type User } from "@/service/user";
import { getTagIcon } from "@/utils/tag";
import { BsSpotify } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { PiRuler } from "react-icons/pi";
import Avatar from "../Avatar";
import SlideCard from "./SlideCard";
import SlideContentWithRightImage from "./SlideContentWithRightImage";
import SlideImages from "./SlideImages";
import { MobileUserCard } from "./MobileUserCard";
import { GoHome, GoLocation } from "react-icons/go";

export interface UserCardProps {
  isShow?: boolean;
  isFirst?: boolean;
  user: User;
  canBack?: boolean;
  onBack?: () => void;
  onLike?: () => void;
  onUnLike?: () => void;
  onReportDone?: () => void;
}

export const UserCard = ({
  isShow,
  isFirst,
  user,
  ...others
}: UserCardProps) => {
  const isMobile = useIsMobile();

  const {
    name,
    age,
    images,
    bio,
    tags,
    height,
    setting,
    spotifyInfo,
    address,
    liveAt,
    homeTown,
  } = user;

  const { firstImage, lastImage, imageSlides } = getImageData(images);

  if (isMobile)
    return (
      <MobileUserCard
        isShow={isShow}
        isFirst={isFirst}
        user={user}
        {...others}
      />
    );

  return (
    <Slider
      className={cn("absolute flex h-full w-full p-1.5 md:p-0", {
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8">
          <p className="font-bold">About {name}</p>

          {bio && <p>{bio}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {height && setting?.hiddenProfile?.height && (
              <span className="flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
                <PiRuler />
                {height} cm
              </span>
            )}

            {tags.map((tag) => {
              const Icon = getTagIcon(tag.type);

              return (
                <span
                  key={tag._id}
                  className="flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700"
                >
                  <Icon />
                  {tag.name}
                </span>
              );
            })}
          </div>
        </div>
      </SlideCard>

      {imageSlides.length > 0 &&
        imageSlides.map((images, i) => <SlideImages key={i} images={images} />)}

      <SlideContentWithRightImage image={lastImage}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
          <p className="text-2xl font-extrabold text-gray-700">
            Vị trí của {name}
          </p>

          <p>
            <MdLocationOn className="mb-1 inline-block" size={18} />
            {address?.province ?? "Thành phố Hồ Chí Minh, Việt Nam"}
          </p>

          {homeTown?.province && (
            <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
              {<GoHome />}
              <span>Đến từ {homeTown.province}</span>
            </span>
          )}

          {liveAt?.province && (
            <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
              {<GoLocation />}
              <span>Sống tại {liveAt.province}</span>
            </span>
          )}

          {spotifyInfo && (
            <div className="space-y-2">
              <p className="flex items-center gap-1 text-sm font-medium">
                <BsSpotify className="flex-shrink-0" />
                Top nghệ sĩ của {name}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {spotifyInfo.map((artist, i) => (
                  <div
                    key={i}
                    className="flex items-center rounded-full bg-primary-100"
                  >
                    <Avatar key={i} size="xs" src={artist.image.url} />
                    <span className="px-2 text-xs">{artist.artist}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SlideContentWithRightImage>
    </Slider>
  );
};

export * from "./CardBox";

export const getImageData = (images: Image[]) => {
  const _images = [...images];

  const firstImage = _images.shift();
  const lastImage = _images.length % 2 === 0 ? firstImage : _images.pop();

  const restImages = _images.splice(1);

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
    restImages,
  };
};
