import BlockAndReport from "@/app/[lng]/app/(main)/components/BlockAndReport";
import { cn } from "@/lib/utils";
import { getTagIcon } from "@/utils/tag";
import {
  BsArrowCounterclockwise,
  BsCheckLg,
  BsSpotify,
  BsXLg,
} from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { GoHome, GoLocation } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";
import { PiGraduationCapBold, PiRuler } from "react-icons/pi";
import { UserCardProps, getImageData } from ".";
import ActionIcon from "../ActionIcon";
import Avatar from "../Avatar";
import CustomImage from "../CustomImage";
import ScrollArea from "../ScrollArea";

export const MobileUserCard = ({
  isShow,
  isFirst,
  user,
  canBack,
  onBack,
  onLike,
  onUnLike,
  onReportDone,
  onSuperLike,
}: UserCardProps) => {
  const {
    name,
    age,
    images,
    bio,
    tags,
    height,
    setting,
    spotifyInfo,
    school,
    address,
    liveAt,
    homeTown,
  } = user;

  const { firstImage, restImages } = getImageData(images);

  return (
    <div
      className={cn("absolute h-full w-full p-1.5 md:p-0", {
        "z-10": isShow,
      })}
    >
      <div
        className="flex h-full w-full"
        style={{
          animation: !isShow && isFirst ? `fadeOut 0.8s` : undefined,
        }}
      >
        <ScrollArea
          className={cn("w-full rounded-lg bg-primary-50 md:rounded-3xl")}
        >
          <div>
            <div className="relative flex aspect-[3/4] w-full flex-col justify-center">
              <CustomImage
                className="object-cover object-center"
                image={firstImage}
                fill
                alt={""}
              />
              <div className="absolute bottom-1.5 left-2 text-white">
                <p className="text-shadow text-xl font-extrabold drop-shadow">
                  {name}, {age}
                </p>
                {school && (
                  <p className="flex items-center gap-1 text-sm">
                    <PiGraduationCapBold
                      className="mb-1 inline-block"
                      size={18}
                    />
                    {school}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-3 px-4 py-5">
              {bio && (
                <div>
                  <p className="text-secondary-foreground">Bio</p>
                  <p>{bio}</p>
                </div>
              )}

              <div>
                <p className="text-secondary-foreground">Một chút về {name}</p>
                <div className="flex flex-wrap gap-2">
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

              {!!spotifyInfo?.length && (
                <div className="space-y-2">
                  <p className="flex items-center gap-1 text-sm font-medium">
                    <BsSpotify className="flex-shrink-0" />
                    Top nghệ sĩ của {name}
                  </p>
                  <div className="flex flex-wrap gap-2">
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

            {restImages.length > 0 &&
              restImages.map((image, i) => (
                <div
                  key={i}
                  className="relative flex aspect-[3/4] w-full flex-col justify-center"
                >
                  <CustomImage
                    className="object-cover object-center"
                    image={image}
                    fill
                    alt={""}
                  />
                </div>
              ))}

            <div className="space-y-3 px-4 py-5">
              <p className="text-xl font-extrabold text-gray-700">
                Vị trí của {name}
              </p>

              <p>
                <MdLocationOn className="mb-1 inline-block text-sm" size={18} />
                {address?.province ?? "Thành phố Hồ Chí Minh, Việt Nam"}
              </p>

              <div className="flex flex-wrap gap-2">
                {homeTown?.province && (
                  <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
                    {<GoHome />}
                    <span>Đến từ {homeTown?.province}</span>
                  </span>
                )}

                {liveAt.province && (
                  <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
                    {<GoLocation />}
                    <span>Sống tại {liveAt.province}</span>
                  </span>
                )}
              </div>

              {onLike && (
                <div className="flex w-full items-center justify-center gap-6 pt-10">
                  {onUnLike && (
                    <ActionIcon
                      className="h-16 w-16 rounded-full bg-white"
                      onClick={onUnLike}
                    >
                      <BsXLg size={28} />
                    </ActionIcon>
                  )}

                  {onSuperLike && (
                    <ActionIcon
                      className="h-14 w-14 -translate-y-1/2 rounded-full bg-primary text-yellow-100"
                      onClick={onSuperLike}
                    >
                      <FaStar size={20} />
                    </ActionIcon>
                  )}

                  {onLike && (
                    <ActionIcon
                      className="h-16 w-16 rounded-full bg-white text-primary"
                      onClick={onLike}
                    >
                      <BsCheckLg size={32} />
                    </ActionIcon>
                  )}
                </div>
              )}

              {onReportDone && (
                <BlockAndReport
                  className="mx-auto w-fit font-medium"
                  target={user}
                  onReportDone={onReportDone}
                />
              )}
            </div>
          </div>
        </ScrollArea>

        {canBack && onBack && (
          <ActionIcon
            className="absolute -top-9 z-10"
            variant="transparent"
            onClick={onBack}
          >
            <BsArrowCounterclockwise />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
