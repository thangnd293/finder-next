import { DEFAULT_IMAGE } from "@/constant/common";
import { cn } from "@/lib/utils";
import { Place } from "@/types/map";
import Image from "next/image";
import DatingSkeletonSkeleton from "./DatingSkeleton";
import UserRating from "../UserRating";
import { buttonBaseVariants } from "../ButtonBase";

interface DatingLocationProps extends Place {}
const DatingLocation = ({
  image,
  name,
  rating,
  userRatingsTotal,
  priceLevel,
  reviews,
  url,
}: DatingLocationProps) => {
  return (
    <div className="flex gap-3">
      <div className="relative h-48 w-48 overflow-hidden rounded-md">
        <Image
          className="origin-center object-cover"
          src={image ?? DEFAULT_IMAGE}
          alt={name}
          fill
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        {rating && userRatingsTotal && (
          <UserRating rating={rating} total={userRatingsTotal} />
        )}
        <p className="text-muted-foreground">
          Giá cả: {priceLevel ? "đ".repeat(priceLevel) : "Không xác định"}
        </p>

        <div className="my-2 w-full border-y border-gray-400 py-2">
          {reviews ? (
            reviews
              .slice(2)
              .map((review, i) => (
                <p key={i}>&quot;{review.text.truncate(40)}&quot;</p>
              ))
          ) : (
            <p>Chưa có đánh giá</p>
          )}
        </div>

        <a
          className={cn(
            buttonBaseVariants({
              size: "sm",
              variant: "outline",
            }),
            "rounded-full",
          )}
          href={url}
          target="_blank"
        >
          Xem thêm
        </a>
      </div>
    </div>
  );
};

export default DatingLocation;

DatingLocation.Skeleton = DatingSkeletonSkeleton;
