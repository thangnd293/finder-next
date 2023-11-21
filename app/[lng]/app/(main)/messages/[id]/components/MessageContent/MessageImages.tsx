import Button from "@/components/Button";
import CustomImage from "@/components/CustomImage";
import { cn } from "@/lib/utils";
import { type Image } from "@/service/user";
import { checkUnseemlyImage } from "@/utils/helper";
import { useEffect, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface MessageImagesProps {
  className?: string;
  images: Image[];
  isEnableSafeMode?: boolean;
}

const MessageImages = ({
  className,
  images,
  isEnableSafeMode,
}: MessageImagesProps) => {
  return (
    <div
      className={cn(
        "message flex w-full !max-w-[338px] flex-wrap gap-0.5",
        className,
      )}
      style={{
        justifyContent: "inherit",
      }}
    >
      {images.map((image, index) => (
        <ImageItem
          key={index}
          image={image}
          isEnableSafeMode={isEnableSafeMode}
        />
      ))}
    </div>
  );
};
export default MessageImages;

interface ImageItemProps {
  image: Image;
  grow?: number;
  isEnableSafeMode?: boolean;
}

const ImageItem = ({ image, grow = 1, isEnableSafeMode }: ImageItemProps) => {
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    if (isEnableSafeMode) {
      setIsBlur(checkUnseemlyImage(image));
    } else setIsBlur(false);
  }, [isEnableSafeMode]);

  return (
    <div
      className={cn(
        "relative aspect-square min-w-[30%] max-w-[200px] flex-1 overflow-hidden rounded-sm",
        {
          "basis-2": grow === 2,
          "basis-3": grow >= 3,
        },
      )}
    >
      <CustomImage
        className={cn("object-cover object-center", {
          blur: isBlur,
        })}
        image={image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {isBlur && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2">
          <p className="text-center text-xs text-white">
            <AiOutlineEyeInvisible
              className="mb-1 inline-block shrink-0"
              size={18}
            />
            Ảnh có thể có nội dung không phù hợp
          </p>
          <Button size="xs" onClick={() => setIsBlur(false)}>
            Xem
          </Button>
        </div>
      )}
    </div>
  );
};
