import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: FC<{ length?: number }> = ({ length = 9 }) =>
  Array.from({ length }).map((_, index) => (
    <Skeleton key={index} className='p-5 w-full h-full bg-skeleton-color' />
  ));

export default LoadingSkeleton;
