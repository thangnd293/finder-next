import CustomImage from "@/components/CustomImage";
import { cn } from "@/lib/utils";
import { type Image } from "@/service/user";

interface MessageImagesProps {
  className?: string;
  images: Image[];
}

const MessageImages = ({ className, images }: MessageImagesProps) => {
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
        <div
          key={index}
          className={cn(
            "relative aspect-square min-w-[30%] max-w-[200px] flex-1 overflow-hidden rounded-sm",
            {
              "basis-2": images.length === 2,
              "basis-3": images.length >= 3,
            },
          )}
        >
          <CustomImage
            className="object-cover object-center"
            image={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
};
export default MessageImages;
