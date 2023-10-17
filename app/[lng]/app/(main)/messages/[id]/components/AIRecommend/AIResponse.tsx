import Button from "@/components/Button";
import { buttonBaseVariants } from "@/components/ButtonBase";
import UserRating from "@/components/UserRating";
import { DEFAULT_IMAGE } from "@/constant/common";
import { cn } from "@/lib/utils";
import { Place } from "@/types/map";
import Image from "next/image";

interface AIResponseProps {
  suggestPlaces: Place[];
  onRegenerate: () => void;
  onOpenScheduleEditor: () => void;
}
const AIResponse = ({
  suggestPlaces,
  onRegenerate,
  onOpenScheduleEditor,
}: AIResponseProps) => {
  if (suggestPlaces.length === 0)
    return (
      <div className="w-full space-y-2 overflow-hidden text-sm">
        <p>Xin lỗi chúng tôi không tìm thấy địa điểm phù hợp ☹️</p>
        <div className="!mt-3 ml-auto w-fit space-x-2">
          <Button size="sm" onClick={onRegenerate}>
            Gợi ý lại
          </Button>
          <Button variant="accent" size="sm" onClick={onOpenScheduleEditor}>
            Tạo cuộc hẹn
          </Button>
        </div>
      </div>
    );

  return (
    <div className="w-full space-y-2 overflow-hidden text-sm">
      <p>Dưới đây là: </p>
      <div className="space-y-4">
        {suggestPlaces.map((place: Place) => (
          <div key={place.place_id} className="flex gap-3">
            <div className="relative h-48 w-48 overflow-hidden rounded-md">
              <Image
                className="origin-center object-cover"
                src={place.image ?? DEFAULT_IMAGE}
                alt={place.name}
                fill
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{place.name}</p>
              {place.rating && place.userRatingsTotal && (
                <UserRating
                  rating={place.rating}
                  total={place.userRatingsTotal}
                />
              )}
              <p className="text-muted-foreground">
                Giá cả:{" "}
                {place.priceLevel
                  ? "đ".repeat(place.priceLevel)
                  : "Không xác định"}
              </p>

              <div className="my-2 w-full border-y border-gray-400 py-2">
                {place.reviews ? (
                  place.reviews
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
                href={place.url}
                target="_blank"
              >
                Xem thêm
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="!mt-3 ml-auto w-fit space-x-2">
        <Button size="sm" onClick={onRegenerate}>
          Gợi ý lại
        </Button>
        <Button variant="accent" size="sm" onClick={onOpenScheduleEditor}>
          Tạo cuộc hẹn
        </Button>
      </div>
    </div>
  );
};

export default AIResponse;
