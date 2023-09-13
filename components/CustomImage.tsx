import React from "react";
import NextImage from "next/image";
import { Image } from "@/service/user";

type NextImageProps = React.ComponentProps<typeof NextImage>;
interface CustomImageProps
  extends Omit<NextImageProps, "src" | "placeholder" | "blurDataURL"> {
  image?: Image;
}

const CustomImage = ({ image, ...others }: CustomImageProps) => {
  return (
    <NextImage
      src={image?.url || ""}
      placeholder={image?.blur ? "blur" : "empty"}
      blurDataURL={image?.blur}
      {...others}
    />
  );
};

export default CustomImage;
