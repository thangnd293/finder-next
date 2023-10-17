import { cn } from "@/lib/utils";
import React from "react";
import RatingStars from "./RatingStars";

interface UserRatingProps {
  className?: string;
  rating: number;
  total: number;
}
const UserRating = ({ className, rating, total }: UserRatingProps) => {
  return (
    <p className={cn("flex items-center gap-1 text-sm", className)}>
      <span>{rating}</span>
      <RatingStars rating={rating} />({total})
    </p>
  );
};

export default UserRating;
