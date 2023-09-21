"use client";

import { arrayMoveImmutable } from "array-move";
import React, { Fragment, useRef, useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import ImageCard from "./ImageCard";
import { cn } from "@/lib/utils";

interface UploadImagesProps {
  value: string[];
  onChange: (images: string[]) => void;
  maxImages: number;
  error?: string;
  className?: string;
}
const UploadImages = ({
  value,
  onChange,
  maxImages,
  error,
  className,
  ...others
}: UploadImagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<string[]>(() => {
    const images = [...value];
    const emptyImages = Array.from({
      length: maxImages - images.length,
    }).fill("") as string[];
    return [...images, ...emptyImages];
  });

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    setImages((pre) => {
      const newImages = arrayMoveImmutable(pre, oldIndex, newIndex);
      onChange(newImages.filter((image) => image));
      return newImages;
    });
  };

  const handleImageChange = (index: number, image: string) => {
    const newImages = [...images];
    newImages[index] = image;

    onChange(newImages.filter((image) => image));

    setImages(newImages);
  };

  const handleDeleteImage = (index: number) => {
    let newImages = [...images];

    newImages = [
      ...newImages.slice(0, index),
      ...newImages.slice(index + 1),
      "",
    ];

    onChange(newImages.filter((image) => image));
    setImages(newImages);
  };

  const handleImagePick = (e: React.MouseEvent<"div", MouseEvent>) => {
    const element = e.target as HTMLElement;

    const isImageCard = element.classList.contains("image-card");
    const hasImage = element.classList.contains("image-card--has-image");
    const isLoading = element.classList.contains("image-card--is-loading");

    const notEmpty = hasImage || isLoading;

    if (isImageCard && !notEmpty) {
      const container = containerRef.current?.children[0] as HTMLElement;
      if (!container) return;

      const firstIndexEmpty = images.indexOf("");

      if (firstIndexEmpty === -1) return;

      const imageCard = container.children[firstIndexEmpty] as HTMLElement;

      if (!imageCard) return;

      const input = imageCard.getElementsByTagName(
        "input",
      )[0] as HTMLInputElement;

      if (!input) return;

      input.click();
    } else if (isImageCard && notEmpty) {
      const imageCard = element as HTMLElement;

      const input = imageCard.getElementsByTagName(
        "input",
      )[0] as HTMLInputElement;

      if (!input) return;

      input.click();
    }
  };

  return (
    <div ref={containerRef} {...others}>
      <SortableList
        onSortEnd={handleSortEnd}
        className={cn("grid w-[500px] select-none gap-4", className)}
        draggedItemClassName="dragged"
        onClick={handleImagePick}
        style={{
          gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${maxImages / 3}, minmax(0, 1fr))`,
        }}
      >
        {images.map((image, index) => {
          const isSortable = image ? true : false;
          const Wrapper = isSortable ? SortableItem : Fragment;

          return (
            <Wrapper key={index}>
              <ImageCard
                image={image}
                error={error}
                onImageChange={(newImage) => handleImageChange(index, newImage)}
                onRemoveImage={() => {
                  handleDeleteImage(index);
                }}
              />
            </Wrapper>
          );
        })}
      </SortableList>
      {error && (
        <p className="pt-2 text-center text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default UploadImages;
