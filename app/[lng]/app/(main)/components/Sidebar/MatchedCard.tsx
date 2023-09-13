import CustomImage from "@/components/CustomImage";
import { Conversation } from "@/service/conversation";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import React from "react";

interface MatchedCardProps extends Conversation {}

const MatchedCard = ({ _id, user }: MatchedCardProps) => {
  return (
    <Link href={`/app/messages/${_id}`}>
      <AspectRatio
        ratio={7 / 9}
        className="relative transition-transform hover:scale-105"
      >
        <CustomImage
          className="rounded-md object-cover object-center"
          fill
          image={user.images[0]}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <p className="absolute bottom-0 left-0 w-full overflow-hidden truncate px-1 text-sm font-bold text-white">
          {user.name}
        </p>
      </AspectRatio>
    </Link>
  );
};

export default MatchedCard;
