import { FC } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";

import { formatDate } from "@/helpers";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useNewsService from "@/services/news";
import { Skeleton } from "@/components/ui/skeleton";

const NewsDetailsComponent: FC = () => {
  const { newsId } = useParams();
  const isOnline = useOnlineStatus();

  const { useGetNewsById } = useNewsService();

  const { isLoading, isError, data: news } = useGetNewsById(newsId!);

  const laoding = isLoading || isError || isOnline;

  return (
    <div className='max-w-[1000px] mx-auto'>
      {laoding ? (
        <Skeleton className='w-full h-[28px] bg-skeleton-color' />
      ) : (
        <h2 className='text-[26px] font-bold text-secondary-black'>
          {news?.title}
        </h2>
      )}

      {laoding ? (
        <Skeleton className='w-[120px] h-[24px] bg-skeleton-color mt-6' />
      ) : (
        <div className='flex items-center gap-2 mt-2'>
          <MdOutlineDateRange className='text-[20px] text-gray' />
          <span className='text-[16px] font-semibold text-gray'>
            {" "}
            {formatDate(news?.createdAt)}
          </span>
        </div>
      )}

      <div className='mt-6 rounded-xl overflow-hidden lg:h-[600px] max-w-full'>
        {laoding ? (
          <Skeleton className='w-full min-h-[250px] h-full bg-skeleton-color my-6' />
        ) : (
          <img
            src={news?.imgUrl}
            alt={news?.title}
            loading='lazy'
            className='w-full h-full object-contain'
          />
        )}
      </div>
      {laoding ? (
        <div>
          <Skeleton className='w-full h-[20px] bg-skeleton-color my-6' />
          <Skeleton className='w-[98%] h-[20px] bg-skeleton-color my-6' />
          <Skeleton className='w-[96%] h-[20px] bg-skeleton-color my-6' />
          <Skeleton className='w-[94%] h-[20px] bg-skeleton-color my-6' />
          <Skeleton className='w-[92%] h-[20px] bg-skeleton-color my-6' />
          <Skeleton className='w-[90%] h-[20px] bg-skeleton-color my-6' />
        </div>
      ) : (
        <p
          className='mt-4 text-[16px] font-semibold text-secondary-black'
          dangerouslySetInnerHTML={{
            __html: news?.content || "No content available",
          }}
        />
      )}
    </div>
  );
};

export default NewsDetailsComponent;
