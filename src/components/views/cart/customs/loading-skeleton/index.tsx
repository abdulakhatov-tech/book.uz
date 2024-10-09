import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: FC = () => {
  return Array.from({ length: 3 }).map((_: any, idx: number) => (
    // <Skeleton
    // 	key={idx}
    // 	className="h-[190px] w-full rounded-[8px] bg-skeleton-color"
    // />

    <div className='bg-skeleton-color px-2 sm:px-4 md:px-6 py-3 sm:py-4 rounded-[8px]'>
      <div className='grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-4 md:gap-6'>
        <div className='w-full h-[150px] rounded-[8px] overflow-hidden'>
          <Skeleton className='w-full h-full' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4'>
          <div className="flex flex-col gap-2 md:gap-4">
            <Skeleton className='w-[100px] md:w-[150px] h-[25px] md:h-[30px]' />
            <Skeleton className='w-[140px] md:w-[180px] h-[20px] md:h-[25px]' />

            <div className='flex items-center flex-wrap md:flex-nowrap gap-2 mt-2 md:mt-4'>
              <Skeleton className='w-[100px] md:w-[180px] h-[28px] md:h-[35px]' />
              <Skeleton className='w-[100px] md:w-[180px] h-[28px] md:h-[35px]' />
            </div>
          </div>
          <div className='h-full flex md:flex-col flex-row-reverse justify-between  items-start md:items-end gap-2 md:gap-4 flex-wrap md:flex-nowrap'>
            <Skeleton className='w-[120px] md:w-[150px] h-[25px] md:h-[30px]' />
            <Skeleton className='w-[120px] md:w-[150px] h-[30px] md:h-[35px]' />
          </div>
        </div>
      </div>
    </div>
  ));
};

export default LoadingSkeleton;
