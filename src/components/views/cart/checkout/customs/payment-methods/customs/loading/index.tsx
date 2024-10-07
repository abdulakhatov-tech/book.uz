import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton:FC = () => {
  return Array.from({length: 3}).map((_:any, idx:number) => <Skeleton key={idx} className="w-full h-[100px] bg-skeleton-color" />)
};

export default LoadingSkeleton;
