import ActionIcon from "@/components/ActionIcon";
import { DEFAULT_IMAGE } from "@/constant/common";
import { cn } from "@/lib/utils";
import { Place } from "@/types/map";
import Image from "next/image";
import { BiMinus } from "react-icons/bi";

interface PlaceItemProps extends Place {
  className?: string;
  onPlaceClick?: (place_id: string) => void;
  onRemovePlace?: (place_id: string) => void;
}
const PlaceItem = ({
  className,
  place_id,
  image,
  name,
  address,
  onPlaceClick,
  onRemovePlace,
}: PlaceItemProps) => {
  return (
    <div
      className={cn(
        "group relative flex gap-2 p-3",
        {
          "cursor-pointer hover:bg-background-50": onPlaceClick,
        },
        className,
      )}
      onClick={() => onPlaceClick?.(place_id)}
    >
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm object-cover object-center">
        <Image src={image ?? DEFAULT_IMAGE} alt={name} fill />
      </div>

      <div className="flex flex-col justify-between overflow-hidden py-1">
        <p className="truncate font-medium">{name}</p>
        <p className="truncate text-sm text-muted-foreground">{address}</p>
      </div>

      {onRemovePlace && (
        <ActionIcon
          className="absolute right-2 top-1/2 flex -translate-y-1/2 rounded-full bg-background-200 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground active:!-translate-y-1/2 active:brightness-90 group-hover:flex md:hidden"
          variant="filled"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemovePlace?.(place_id);
          }}
        >
          <BiMinus size={20} />
        </ActionIcon>
      )}
    </div>
  );
};

export default PlaceItem;
