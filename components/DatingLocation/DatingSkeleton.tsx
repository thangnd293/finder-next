import { randomNumber } from "@/utils/helper";
import { Skeleton } from "../Skeleton";

const DatingSkeletonSkeleton = () => {
  return (
    <div className="flex gap-3">
      <Skeleton className="relative h-48 w-48 overflow-hidden rounded-md" />
      <div className="flex-1">
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        <div className="my-2 w-full space-y-2 border-y border-gray-100 py-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-5"
              style={{
                width: `${randomNumber(40, 80)}%`,
              }}
            />
          ))}
        </div>

        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
};

export default DatingSkeletonSkeleton;
