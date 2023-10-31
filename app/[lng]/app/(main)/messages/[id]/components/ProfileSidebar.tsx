"use client";

import ActionIcon from "@/components/ActionIcon";
import AspectRatio from "@/components/AspectRatio";
import CustomImage from "@/components/CustomImage";
import ErrorView from "@/components/ErrorView";
import LoadingView from "@/components/LoadingView";
import ScrollArea from "@/components/ScrollArea";
import { useReceiver } from "@/service/conversation";
import { User } from "@/service/user";
import { getTagIcon } from "@/utils/tag";
import { BsXLg } from "react-icons/bs";
import { GoHome, GoLocation } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";

interface ProfileSidebarProps {
  conversation: string;
  onCloseSidebar: () => void;
}
const ProfileSidebar = ({
  conversation: conversationID,
  onCloseSidebar,
}: ProfileSidebarProps) => {
  const { receiver, isError, isLoading } = useReceiver(conversationID);

  if (isLoading)
    return (
      <div className="flex h-full w-80 items-center justify-center">
        <LoadingView />
      </div>
    );

  if (isError || !receiver)
    return (
      <div className="flex h-full w-80 items-center justify-center">
        <ErrorView className="px-10" imageSize={128} />
      </div>
    );

  return (
    <div className="relative h-full w-80">
      <ActionIcon
        className="text-shadow absolute right-3 top-2 z-10 text-white"
        variant="transparent"
        onClick={onCloseSidebar}
      >
        <BsXLg size={22} />
      </ActionIcon>

      <VerticalUserCard {...receiver} />
    </div>
  );
};

export default ProfileSidebar;

interface VerticalUserCardProps extends User {}
const VerticalUserCard = ({
  name,
  age,
  images,
  address,
  tags,
  bio,
  height,
  setting,
  homeTown,
  liveAt,
}: VerticalUserCardProps) => {
  const _images = [...images];
  const firstImage = _images.shift();
  const HeightIcon = getTagIcon("height");

  return (
    <div className="h-full w-full space-y-px bg-primary-50">
      <ScrollArea className="h-full">
        <AspectRatio className="relative w-full" ratio={3 / 4}>
          <CustomImage
            className="object-cover object-center"
            image={firstImage}
            alt={""}
            fill
          />
          <p className="text-shadow absolute bottom-0 left-0 w-full truncate p-4 text-xl font-semibold text-white">
            {name}, {age}
          </p>
        </AspectRatio>

        <div className="space-y-5 p-6 text-sm">
          {bio && <p className="font-medium">{bio}</p>}
          <p className="font-medium">Một chút về {name}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {tags?.map((tag) => {
              const Icon = getTagIcon(tag.type);
              return (
                <span
                  key={tag._id}
                  className="flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700"
                >
                  {<Icon />}
                  {tag.name}
                </span>
              );
            })}
            {height! && setting.hiddenProfile.height && (
              <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
                {<HeightIcon />}
                {height}
              </span>
            )}
          </div>
        </div>

        {_images?.map((image, index) => (
          <AspectRatio key={index} className="relative w-full" ratio={3 / 4}>
            <CustomImage
              className="object-cover object-center"
              image={image}
              alt={""}
              fill
            />
          </AspectRatio>
        ))}

        <div className="space-y-2 p-6 text-sm">
          <p className="text-xl font-extrabold text-gray-700">
            Vị trí của {name}
          </p>

          <p>
            <MdLocationOn className="mb-1 inline-block" size={18} />
            {address?.province}
          </p>
          {homeTown.province && (
            <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
              {<GoHome />}
              <span>Đến từ {homeTown.province}</span>
            </span>
          )}

          {liveAt.province && (
            <span className="flex items-center gap-2 rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700">
              {<GoLocation />}
              <span>Sống tại {liveAt.province}</span>
            </span>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
