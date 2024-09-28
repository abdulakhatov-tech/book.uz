import type { FC } from "react";
import banner from "@/assets/images/banner-download.png";
import useLoading from "@/utils/custom-loading";
import { Skeleton } from "@/components/ui/skeleton";

const Banner: FC = () => {
    const { isLoading } = useLoading();

    if(isLoading) {
        return <Skeleton className="bg-skeleton-color w-full h-[200px] sm:h-[250px] md:h-[350px]"  />
    }

  return (
    <div className='w-full overflow-hidden'>
      <img
        src={banner}
        alt='Banner for Downloading App'
        className='w-full object-cover'
      />
    </div>
  );
};

export default Banner;
