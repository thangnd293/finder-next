import ActionIcon from "@/components/ActionIcon";
import AspectRatio from "@/components/AspectRatio";
import CustomImage from "@/components/CustomImage";
import { MatchRequest } from "@/service/matchRequest";
import Image from "next/image";
import { BsCheckLg, BsXLg } from "react-icons/bs";

interface MatchRequestCardProps extends MatchRequest {
  onLike: (id: string) => void;
  onSkip: (id: string) => void;
}
const MatchRequestCard = ({
  sender,
  onLike,
  onSkip,
}: MatchRequestCardProps) => {
  const { blurAvatar, images } = sender;
  return (
    <div className="relative overflow-hidden rounded-md">
      <AspectRatio className="relative" ratio={7 / 9}>
        {blurAvatar && (
          <Image
            className="object-cover object-center"
            src={sender.blurAvatar}
            alt=""
            fill
          />
        )}

        {images[0] && (
          <CustomImage
            className="object-cover object-center"
            image={images[0]}
            alt=""
            fill
          />
        )}
      </AspectRatio>
      <div
        className="absolute bottom-0 flex w-full items-center justify-evenly py-1.5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0) -2%, rgba(0, 0, 0, 0.4) 20%)",
        }}
      >
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
  );
};

export default MatchRequestCard;
