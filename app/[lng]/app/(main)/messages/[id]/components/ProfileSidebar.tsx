"use client";

import ActionIcon from "@/components/ActionIcon";
import AspectRatio from "@/components/AspectRatio";
import CustomImage from "@/components/CustomImage";
import Spinner from "@/components/Spinner";
import { useReceiver } from "@/service/conversation";
import React from "react";
import { BsXLg } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

interface ProfileSidebarProps {
  conversation: string;
  onCloseSidebar: () => void;
}
const ProfileSidebar = ({
  conversation,
  onCloseSidebar,
}: ProfileSidebarProps) => {
  const { receiver, isLoading } = useReceiver(conversation);
  console.log("receiver", receiver);

  const images = receiver?.images || [];
  const firstImage = images.shift();

  if (isLoading)
    return (
      <div className="flex h-full w-80 items-center justify-center">
        <Spinner size={30} />
      </div>
    );

  return (
    <div className="relative h-full w-80 space-y-px overflow-auto">
      <ActionIcon
        className="absolute right-1 top-1 z-10 text-white"
        variant="transparent"
        onClick={onCloseSidebar}
      >
        <BsXLg size={22} />
      </ActionIcon>

      <AspectRatio className="relative w-full" ratio={3 / 4}>
        <CustomImage
          className="object-cover object-center"
          image={firstImage}
          alt={""}
          fill
        />
        <p className="absolute bottom-0 left-0 w-full truncate p-4 text-xl font-semibold text-white">
          {receiver?.name}, {receiver?.age}
        </p>
      </AspectRatio>

      <div className="bg-primary-50 p-6 text-sm">
        <p className="font-medium">Về {receiver?.name}</p>
        {receiver?.bio && <p className="font-medium">{receiver?.bio}</p>}

        <div className="flex flex-wrap justify-center gap-2">
          {receiver?.tags?.map((tag) => (
            <span
              key={tag._id}
              className="rounded-full bg-primary-100 px-2 py-1 text-sm text-gray-700"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {receiver?.images?.map((image, index) => (
        <AspectRatio key={index} className="relative w-full" ratio={3 / 4}>
          <CustomImage
            className="object-cover object-center"
            image={image}
            alt={""}
            fill
          />
        </AspectRatio>
      ))}

      <div className="space-y-2 bg-primary-50 p-6 text-sm">
        <p className="text-xl font-extrabold text-gray-700">
          {receiver?.name}&apos;s location
        </p>

        <p>
          <MdLocationOn className="mb-1 inline-block" size={18} />
          Thành phố Hồ Chí Minh, Việt Nam
        </p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
