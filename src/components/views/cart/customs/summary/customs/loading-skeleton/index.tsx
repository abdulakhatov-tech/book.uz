import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const LoadingSkeleton: FC = () => {
  return (
    <div className='bg-secondary-gray pt-4 pb-[100px] sm:py-4 px-4 rounded-[8px] h-fit min-h-[198px]'>
      <Skeleton className='h-5 w-full bg-skeleton-color' />

      <ul className='mt-4 flex flex-col gap-4'>
        <li className='flex items-center justify-between'>
          <Skeleton className='h-5 w-[30%] bg-skeleton-color' />
          <span className='flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]'></span>
          <Skeleton className='h-5 w-[45%] bg-skeleton-color' />
        </li>
        <li className='flex items-center justify-between'>
          <Skeleton className='h-5 w-[40%] bg-skeleton-color' />
          <span className='flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]'></span>
          <Skeleton className='h-5 w-[30%] bg-skeleton-color' />
        </li>
        <li className='flex items-center justify-between'>
          <Skeleton className='h-5 w-[30%] bg-skeleton-color' />
          <span className='flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]'></span>
          <Skeleton className='h-5 w-[40%] bg-skeleton-color' />
        </li>

        <span className='flex-grow border-b-[1px] border-b-[#cbcbcb] my-1' />

        <li className='flex items-center justify-between'>
          <Skeleton className='h-5 w-[25%] bg-skeleton-color' />
          <span className='flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]'></span>
          <Skeleton className='h-5 w-[45%] bg-skeleton-color' />
        </li>
      </ul>
    </div>
  );
};

export default LoadingSkeleton;
