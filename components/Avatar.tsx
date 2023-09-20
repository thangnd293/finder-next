"use client";

import React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

const Avatar = ({ className, size, src, alt, fallback }: AvatarProps) => {
  return (
    <RadixAvatar.Root className={cn(avatarVariants({ size, className }))}>
      <RadixAvatar.Image
        className="h- h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />
      {fallback && (
        <RadixAvatar.Fallback className="leading-1 flex h-full w-full items-center justify-center bg-secondary-background text-[15px] font-medium text-foreground">
          {fallback}
        </RadixAvatar.Fallback>
      )}
    </RadixAvatar.Root>
  );
};

const avatarVariants = cva(
  "bg-secondary-background inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-12 w-12",
        lg: "h-16 w-16",
      },
    },

    defaultVariants: {
      size: "default",
    },
  },
);

export default Avatar;
