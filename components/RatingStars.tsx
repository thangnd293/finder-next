import { cn } from "@/lib/utils";

interface RatingStarProps {
  className?: string;
  rating?: number;
}
const RatingStars = ({ className, rating = 0 }: RatingStarProps) => {
  const starPercentage = (rating / 5) * 100;

  return (
    <div className={cn("relative w-fit text-muted-foreground/50", className)}>
      <div
        className="absolute left-0 top-0 block overflow-hidden text-yellow-500"
        style={{ width: `${starPercentage}%` }}
      >
        <span className="inline-block">★★★★★</span>
      </div>
      <div>
        <span>★★★★★</span>
      </div>
    </div>
  );
};

export default RatingStars;
