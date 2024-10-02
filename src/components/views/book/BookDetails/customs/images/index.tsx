import { FC } from "react";

import useImagesFeatures from "./features";
import { Skeleton } from "@/components/ui/skeleton";

const Images: FC = () => {
  const {
    loading,
    book,
    images,
    activeIndex,
    handleImageError,
    handleImageClick,
  } = useImagesFeatures();

  return (
    <div className='flex flex-col-reverse lg:flex-row gap-4'>
      {/* Thumbnails */}
      <div className='grid grid-cols-4 lg:grid-cols-[minmax(85px,_1fr)] lg:max-w-[85px] gap-4 h-fit'>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className='w-full h-[95px] sm:h-[100px] lg:h-[95px] aspect-[6/7] rounded-[8px] custom-shadow bg-skeleton-color'
              />
            ))
          : book?.additionalImages?.map((url, idx) => (
              <div
                key={url || idx}
                className='max-h-[95px] rounded-[8px] overflow-hidden custom-shadow cursor-pointer'
                onClick={() => handleImageClick(idx)}
              >
                <img
                  src={url}
                  className='w-full h-full object-fit aspect-[2/3] transition-transform hover:scale-110'
                  loading='lazy'
                  onError={handleImageError}
                />
              </div>
            ))}
      </div>

      <div className='w-full min-h-[400px] max-h-[700px] lg:max-h-[543px] rounded-[8px] flex items-center justify-center overflow-hidden relative bg-secondary-gray'>
        {loading ? (
          <Skeleton className='w-full h-full object-cover bg-skeleton-color' />
        ) : (
          <div
            className='flex transition-transform duration-500'
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((url, idx) => (
              <img
                key={url || idx}
                src={url}
                alt={book?.name || "Book"}
                className='w-full h-full object-contain aspect-[6/7]'
                loading='lazy'
                onError={handleImageError}
                style={{ minWidth: "100%" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;
