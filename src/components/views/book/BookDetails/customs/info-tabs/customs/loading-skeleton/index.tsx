import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: FC = () => {
  return Array.from({ length: 4 }).map((_: any, idx: number) => (
    <ul key={idx} className='bg-white p-4 rounded-[8px] mb-4'>
      <li className='flex flex-col gap-2'>
        <Skeleton className='w-[320px] h-[20px] bg-skeleton-color' />
        <Skeleton className='w-[250px] h-[20px] bg-skeleton-color' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='w-[full] h-[15px] bg-skeleton-color' />
          <Skeleton className='w-[95%] h-[15px] bg-skeleton-color' />
          <Skeleton className='w-[90%] h-[15px] bg-skeleton-color' />
        </div>
      </li>
    </ul>
  ));
};

export default LoadingSkeleton;
