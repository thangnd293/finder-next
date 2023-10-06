"use client";

import { arrayMoveImmutable } from "array-move";
import React, { Fragment, useRef, useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import ImageCard from "./ImageCard";
import { cn } from "@/lib/utils";
import { Image } from "@/service/user";

interface UploadImagesProps {
  value: Image[];
  onChange: (images: Image[]) => void;
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

  const [images, setImages] = useState<Image[]>(() => {
    const images = [...value];
    const emptyImages = Array.from({
      length: maxImages - images.length,
    }).fill({
      url: "",
    }) as Image[];
    return [...images, ...emptyImages];
  });

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    setImages((pre) => {
      const newImages = arrayMoveImmutable(pre, oldIndex, newIndex);
      onChange(filterEmptyImages(newImages));
      return newImages;
    });
  };

  const handleImageChange = (index: number, image: Image) => {
    const newImages = [...images];
    newImages[index] = image;

    onChange(filterEmptyImages(newImages));

    setImages(newImages);
  };

  const handleDeleteImage = (index: number) => {
    let newImages = [...images];

    newImages = [
      ...newImages.slice(0, index),
      ...newImages.slice(index + 1),
      {
        url: "",
      },
    ];

    onChange(filterEmptyImages(newImages));
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

      const firstIndexEmpty = images.findIndex((image) => !image.url);

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
    <div className="w-full" ref={containerRef} {...others}>
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

const filterEmptyImages = (images: Image[]) => {
  return images.filter((image) => image.url);
};
