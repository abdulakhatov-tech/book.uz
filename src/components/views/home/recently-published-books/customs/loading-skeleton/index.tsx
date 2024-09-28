import type { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CarouselItem } from "@/components/ui/carousel";

const LoadingSkeleton: FC = () => {
  return (
    <CarouselItem className='basis-[100%] sm:basis-[80%] md:basis-[60%] lg:basis-[40%] lg:mr-[14px]'>
      <div className='grid grid-cols-[130px_1fr] sm:grid-cols-[160px_1fr] md:grid-cols-[190px_1fr] rounded-[16px] h-full max-w-[480px] bg-skeleton-color'>
        <div className='relative'>
          <Skeleton className='md:absolute -top-[40px] left-[50%] р-full md:-translate-x-[50%] w-full max-w-[164px] h-full max-h-[226px] bg-skeleton-color' />
        </div>
        <Skeleton className='w-full px-[12px] md:pr-[18px] py-[14px] md:py-[16px] h-[200px] bg-skeleton-color' />
      </div>
    </CarouselItem>
  );
};

export default LoadingSkeleton;
