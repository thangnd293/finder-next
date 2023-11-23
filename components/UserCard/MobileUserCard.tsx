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
import BoostButton from "../BoostButton";
import { RxBackpack } from "react-icons/rx";
import { ReactNode } from "react";
import VerifiedIcon from "@/assets/icons/verified-icon";

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
    jobs,
    company,
    isVerifiedFace,
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
          className={cn("w-full rounded-lg bg-primary-50 md:rounded-3xl", {
            "!rounded-none": !onLike,
          })}
        >
          <div>
            <div className="relative flex aspect-[3/4] w-full flex-col justify-center">
              <CustomImage
                className="object-cover object-center"
                image={firstImage}
                fill
                alt={""}
              />
              <div className="absolute bottom-1.5 left-2 text-white drop-shadow">
                <p className="text-shadow flex items-center gap-2 text-xl font-extrabold">
                  {name}, {age}
                  {isVerifiedFace && <VerifiedIcon width={20} />}
                </p>
                {jobs && jobs.length > 0 && company && (
                  <p className="flex items-center gap-2">
                    <RxBackpack size={14} />
                    <span>
                      {jobs?.[0]} tại {company}
                    </span>
                  </p>
                )}
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
            <div className="space-y-4 px-4 py-5">
              {bio && (
                <Section title="Mô tả">
                  <p className="text-gray-600">{bio}</p>
                </Section>
              )}

              <Section title={`Một chút về ${name}`}>
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
              </Section>

              {!!spotifyInfo?.length && (
                <Section
                  title={
                    <>
                      <BsSpotify className="flex-shrink-0" />
                      Top nghệ sĩ của {name}
                    </>
                  }
                >
                  <div className="flex flex-wrap gap-2">
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
                </Section>
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

              <p className="text-gray-600">
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

                {liveAt?.province && (
                  <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
                    {<GoLocation />}
                    <span>Sống tại {liveAt?.province}</span>
                  </span>
                )}
              </div>

              {onLike && (
                <div className="flex w-full items-center justify-center gap-6 pt-10">
                  {onUnLike && (
                    <ActionIcon
                      className="h-16 w-16 rounded-full bg-background"
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
                      className="h-16 w-16 rounded-full bg-background text-primary"
                      onClick={onLike}
                    >
                      <BsCheckLg size={32} />
                    </ActionIcon>
                  )}
                  <BoostButton className="fixed right-4 top-3/4" />
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

const Section = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
        {title}
      </p>
      {children}
    </div>
  );
};
