import  { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton:FC = () => {
  return Array.from({length: 4}).map((_: any, idx: number) => <Skeleton key={idx} className="h-[190px] w-full rounded-[8px] bg-skeleton-color" />)
};

export default LoadingSkeleton;
