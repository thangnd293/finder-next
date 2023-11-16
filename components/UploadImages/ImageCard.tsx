import Spinner from "@/components/Spinner";
import { useCldUpload } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import { Image, useCurrentUser } from "@/service/user";
import React from "react";
import { BsXLg } from "react-icons/bs";
import CustomImage from "../CustomImage";
import axiosInstance from "@/lib/axios";

interface ImageCardProps {
  image: Image;
  error?: string;
  onImageChange: (image: Image) => void;
  onRemoveImage: () => void;
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({ image, error, onImageChange, onRemoveImage }, ref) => {
    const user = useCurrentUser();
    const cldUpload = useCldUpload();

    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file = event.target.files?.[0];

      if (!file) return;

      cldUpload.mutate(file, {
        onSuccess: (result) => {
          onImageChange({
            url: result.url,
          });
        },
      });
    };

    return (
      <div ref={ref}>
        <div
          className={cn(
            "image-card",
            "min-w-40 relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl border bg-background p-2",
            error && "border-destructive",
            image.url && "image-card--has-image",
            cldUpload.isLoading && "image-card--is-loading",
          )}
        >
          {image.url && !cldUpload.isLoading && (
            <div className="relative h-full w-full">
              <CustomImage
                image={image}
                className="pointer-events-none select-none rounded-lg object-cover object-center"
                alt={""}
                fill
              />
              {image?.isVerifiedSuccess && (
                <img
                  className="absolute bottom-[1px] right-[1px] w-[50%] object-cover"
                  src="/images/verified.jpg"
                />
              )}
              <button
                className="absolute right-0 top-0 cursor-pointer rounded-md bg-background p-2"
                type="button"
                onClick={onRemoveImage}
              >
                <BsXLg />
              </button>
            </div>
          )}
          {!image.url && !cldUpload.isLoading && (
            <div className="pointer-events-none flex h-full w-full items-center justify-center rounded-lg bg-background-100">
              <div className="absolute flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary">
                <div className="relative h-[64%] w-[64%] before:absolute before:left-[50%] before:top-[50%] before:h-[4px] before:w-[64%] before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded before:bg-white after:absolute after:left-[50%] after:top-[50%] after:h-[64%] after:w-[4px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded after:bg-white" />
              </div>
            </div>
          )}

          {cldUpload.isLoading && (
            <div className="pointer-events-none flex h-full w-full items-center justify-center rounded-lg bg-background-100">
              <Spinner />
            </div>
          )}

          <input
            name="upload-image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            onClick={(e) => (e.currentTarget.value = "")}
            hidden
          />
        </div>
      </div>
    );
  },
);

ImageCard.displayName = "ImageCard";

export default ImageCard;
