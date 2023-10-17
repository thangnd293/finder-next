import Image from "next/image";
import { BsClock, BsGeoAlt, BsTelephoneFill } from "react-icons/bs";
import { FaEarthAsia } from "react-icons/fa6";
import ScrollArea from "@/components/ScrollArea";
import Button from "@/components/Button";
import { DEFAULT_IMAGE } from "@/constant/common";
import RatingStars from "@/components/RatingStars";
import UserRating from "../UserRating";

interface PlaceDetailProps {
  place: google.maps.places.PlaceResult;
  isChoosing?: boolean;
  onAddPlace?: (place: google.maps.places.PlaceResult) => void;
  onRemovePlace?: (place: google.maps.places.PlaceResult) => void;
}
const PlaceDetail = ({
  place,
  isChoosing,
  onAddPlace,
  onRemovePlace,
}: PlaceDetailProps) => {
  return (
    <ScrollArea className="h-fit max-h-[calc(100vh-80px)] w-full rounded-2xl bg-background">
      <div>
        <div className="relative aspect-card w-full overflow-hidden">
          <Image
            fill
            src={place.photos?.[0].getUrl() ?? DEFAULT_IMAGE}
            alt={place.name ?? ""}
          />
        </div>
        <div className="space-y-1 px-6 py-4">
          <h1 className="text-xl">{place.name}</h1>
          {!!(place.rating && place.user_ratings_total) ? (
            <UserRating
              rating={place.rating}
              total={place.user_ratings_total}
            />
          ) : (
            <p className="text-sm">Chưa có đánh giá</p>
          )}
          {isChoosing ? (
            <Button
              className="!mt-3 w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
              variant="outline"
              size="sm"
              onClick={() => onRemovePlace?.(place)}
            >
              Xoá khỏi lịch trình
            </Button>
          ) : (
            <Button
              className="!mt-3 w-full"
              variant="outline"
              size="sm"
              onClick={() => onAddPlace?.(place)}
            >
              Thêm vào lịch trình
            </Button>
          )}
        </div>

        <div className="border-t py-4">
          <div className="flex gap-4 px-6 py-4 text-sm hover:bg-background-50">
            <BsGeoAlt className="flex-shrink-0 self-start" size={18} />
            {place.formatted_address}
          </div>

          <div className="flex gap-4 px-6 py-4 text-sm hover:bg-background-50">
            <BsClock className="flex-shrink-0 self-start" size={18} />
            {place.opening_hours?.isOpen() ? (
              <span className="text-green-600">Đang mở cửa</span>
            ) : (
              <span className="text-red-600">Đã đóng cửa</span>
            )}
          </div>

          <div className="flex gap-4 px-6 py-4 text-sm hover:bg-background-50">
            <BsTelephoneFill className="flex-shrink-0 self-start" size={18} />
            {place.international_phone_number ?? "Không có số điện thoại"}
          </div>

          <div className="flex gap-4 px-6 py-4 text-sm hover:bg-background-50">
            <FaEarthAsia className="flex-shrink-0 self-start" size={18} />
            {place.website ? (
              <a
                className="text-blue-600 hover:underline"
                href={place.website}
                target="_blank"
              >
                {place.website}
              </a>
            ) : (
              "Không có trang web"
            )}
          </div>

          <a
            className="mx-auto block w-fit text-sm text-blue-600 hover:underline"
            href={place.url}
            target="_blank"
          >
            Xem chi tiết
          </a>
        </div>

        {place.reviews && (
          <div className="border-t px-6 py-4">
            <p className="py-3 font-medium">
              Tất cả các đánh giá ({place.reviews.length})
            </p>
            <div>
              {place.reviews?.map((review, i) => (
                <Review
                  key={i}
                  authorName={review.author_name}
                  authorUrl={review.author_url}
                  profilePhotoUrl={review.profile_photo_url}
                  rating={review.rating}
                  relativeTimeDescription={review.relative_time_description}
                  text={review.text}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PlaceDetail;

interface ReviewProps {
  authorUrl?: string;
  profilePhotoUrl: string;
  authorName: string;
  rating?: number;
  relativeTimeDescription: string;
  text: string;
}
const Review = ({
  authorUrl,
  profilePhotoUrl,
  authorName,
  rating,
  relativeTimeDescription,
  text,
}: ReviewProps) => {
  return (
    <div className="space-y-1 border-b py-4 last:border-b-0">
      <a
        className="flex flex-shrink-0 items-center gap-2 hover:underline"
        href={authorUrl}
        target="_blank"
      >
        <Image
          className="rounded-full"
          src={profilePhotoUrl}
          alt={authorName ?? ""}
          width={40}
          height={40}
        />
        <h3 className="font-medium">{authorName}</h3>
      </a>

      <div>
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} />
          <span className="text-sm text-muted-foreground">
            {relativeTimeDescription}
          </span>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};
