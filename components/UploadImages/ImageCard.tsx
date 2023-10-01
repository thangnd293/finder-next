import Spinner from "@/components/Spinner";
import { useCldUpload } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";
import CropImageDialog from "./CropImageDialog";
import { Image } from "@/service/user";
import CustomImage from "../CustomImage";

interface ImageCardProps {
  image: Image;
  error?: string;
  onImageChange: (image: Image) => void;
  onRemoveImage: () => void;
}
const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({ image, error, onImageChange, onRemoveImage }, ref) => {
    const [file, setFile] = useState<File>();
    const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
    const cldUpload = useCldUpload();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setFile(file);
      setIsOpenCropDialog(true);
    };

    const handleCropDone = (file: File) => {
      setIsOpenCropDialog(false);
      setFile(undefined);

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
            image && "image-card--has-image",
            cldUpload.isLoading && "image-card--is-loading",
          )}
        >
          {image.url && !cldUpload.isLoading && (
            <>
              <CustomImage
                image={image}
                className="pointer-events-none select-none rounded-lg object-cover"
                alt={""}
                width={138}
                height={138}
              />
              <button
                className="absolute right-0 top-0 cursor-pointer rounded-md bg-background p-2"
                type="button"
                onClick={onRemoveImage}
              >
                <BsXLg />
              </button>
            </>
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

        <CropImageDialog
          isVisible={isOpenCropDialog}
          file={file}
          onCropDone={handleCropDone}
          closeModal={() => {
            setIsOpenCropDialog(false);
            setFile(undefined);
          }}
        />
      </div>
    );
  },
);

ImageCard.displayName = "ImageCard";

export default ImageCard;
