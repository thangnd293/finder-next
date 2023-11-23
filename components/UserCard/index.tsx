import Slider from "./Slider";

import VerifiedIcon from "@/assets/icons/verified-icon";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { type Image, type User } from "@/service/user";
import { getTagIcon } from "@/utils/tag";
import { BsSpotify } from "react-icons/bs";
import { GoHome, GoLocation } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";
import { PiGraduationCapBold, PiRuler } from "react-icons/pi";
import { RxBackpack } from "react-icons/rx";
import Avatar from "../Avatar";
import { MobileUserCard } from "./MobileUserCard";
import SlideCard from "./SlideCard";
import SlideContentWithRightImage from "./SlideContentWithRightImage";
import SlideImages from "./SlideImages";

type UserCardWithActionProps = {
  canBack: boolean;
  onBack: () => void;
  onLike: () => void;
  onUnLike: () => void;
  onReportDone: () => void;
  onSuperLike: () => void;
};

type UserCardWithoutActionProps = {
  canBack?: never;
  onBack?: never;
  onLike?: never;
  onUnLike?: never;
  onReportDone?: never;
  onSuperLike?: never;
};
export type UserCardProps = {
  isShow?: boolean;
  isFirst?: boolean;
  user: User;
} & (UserCardWithActionProps | UserCardWithoutActionProps);

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
    isVerifiedFace,
    calcDistance,
    school,
    jobs,
    company,
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
        <div className="flex h-full w-full flex-col justify-center gap-1 p-8 text-gray-700">
          <p className="flex items-center gap-2 text-2xl font-extrabold">
            {name}, {age}
            {isVerifiedFace && <VerifiedIcon />}
          </p>
          {jobs && jobs.length > 0 && company && (
            <p className="flex items-center gap-2">
              <RxBackpack
                className="mt-1.5 flex-shrink-0 self-start"
                size={14}
              />
              <span>
                {jobs?.[0]} tại {company}
              </span>
            </p>
          )}

          {school && (
            <p className="flex items-center gap-2">
              <PiGraduationCapBold
                className="mt-1.5 flex-shrink-0 self-start"
                size={15}
              />
              <span>{school}</span>
            </p>
          )}
        </div>
      </SlideContentWithRightImage>

      <SlideCard>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-gray-700">
          <p className="font-bold">Về {name}</p>

          {bio && <p>{bio}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {height && setting?.hiddenProfile?.height && (
              <span className="flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-sm">
                <PiRuler />
                {height} cm
              </span>
            )}

            {tags.map((tag) => {
              const Icon = getTagIcon(tag.type);

              return (
                <span
                  key={tag._id}
                  className="flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-sm"
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center text-gray-700">
          <p className="text-2xl font-extrabold">Vị trí của {name}</p>

          <p>
            <MdLocationOn className="mb-1 inline-block" size={18} />
            {address?.province ?? "Thành phố Hồ Chí Minh, Việt Nam"}{" "}
            {calcDistance && `, ~${Math.round(calcDistance / 1000)} km`}
          </p>

          {homeTown?.province && (
            <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm">
              {<GoHome />}
              <span>Đến từ {homeTown?.province}</span>
            </span>
          )}

          {liveAt?.province && (
            <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm">
              {<GoLocation />}
              <span>Sống tại {liveAt?.province}</span>
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
                    <span className="px-2 text-xs text-gray-600">
                      {artist.artist}
                    </span>
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

  const restImages = [..._images].splice(1);

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
