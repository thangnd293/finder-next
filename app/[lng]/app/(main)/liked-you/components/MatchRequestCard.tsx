import VerifiedIcon from "@/assets/icons/verified-icon";
import ActionIcon from "@/components/ActionIcon";
import AspectRatio from "@/components/AspectRatio";
import CustomImage from "@/components/CustomImage";
import { MatchRequest } from "@/service/matchRequest";
import Image from "next/image";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { RxBackpack } from "react-icons/rx";

interface MatchRequestCardProps extends MatchRequest {
  onLike: (id: string) => void;
  onSkip: (id: string) => void;
}
const MatchRequestCard = ({
  sender,
  onLike,
  onSkip,
}: MatchRequestCardProps) => {
  const { blurAvatar, images, name, age, isVerifiedFace, jobs, company } =
    sender;

  return (
    <div className="relative overflow-hidden rounded-md">
      <AspectRatio className="relative" ratio={7 / 9}>
        {images?.[0] ?
          <CustomImage
            className="object-cover object-center"
            image={images?.[0]}
            alt=""
            fill
          />
        : <Image
            className="object-cover object-center"
            src={blurAvatar}
            alt=""
            fill
          />
        }
      </AspectRatio>
      {images?.length > 0 && (
        <div
          className="absolute bottom-0 w-full py-1.5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0) -2%, rgba(0, 0, 0, 0.4) 20%)",
          }}
        >
          {images?.[0] ?
            <div className="w-full px-2">
              <p className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="truncate">
                  {name}, {age}
                </span>
                {isVerifiedFace && (
                  <VerifiedIcon className="shrink-0" width={20} />
                )}
              </p>
              {jobs && jobs.length > 0 && company && (
                <p className="flex items-center gap-2 text-white">
                  <RxBackpack size={14} />
                  <span>
                    {jobs?.[0]} tại {company}
                  </span>
                </p>
              )}
            </div>
          : <div className="w-full space-y-1">
              <div className="h-2.5 w-1/2 rounded-full bg-gray-300" />
              <div className="h-2.5 w-1/3 rounded-full bg-background-200" />
            </div>
          }
          <div className="flex w-full items-center justify-evenly">
            <ActionIcon
              className="h-11 w-11 rounded-full !border-destructive text-destructive  hover:bg-destructive hover:text-white"
              onClick={() => onSkip(sender._id)}
            >
              <BsXLg size={18} />
            </ActionIcon>

            <ActionIcon
              className="h-11 w-11 rounded-full !border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => onLike(sender._id)}
            >
              <BsCheckLg size={22} />
            </ActionIcon>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchRequestCard;
