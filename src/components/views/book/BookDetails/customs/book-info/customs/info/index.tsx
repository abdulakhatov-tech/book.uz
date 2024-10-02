import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Skeleton } from "@/components/ui/skeleton";
import useBookDetailsFeatures from "../../../../features";

const Actions: FC = () => {
  const { t } = useTranslation();
  const { loading, book } = useBookDetailsFeatures();

  return (
    <div>
      {!loading ? (
        <ul className='flex flex-col gap-4 mt-4'>
          <li className='flex'>
            <h4 className='text-[#5E5E5E] text-[16px] font-semibold leading-[17.36px]'>
              {t("book.genre")}
            </h4>
            <span className='flex-grow mx-2 border-b border-dashed border-[#5E5E5E]'></span>
            <h4 className='text-secondary-black text-[16px] font-semibold leading-[17.36px] max-w-[290px] w-fit text-right'>
              {book?.genre?.name}
            </h4>
          </li>
          <li className='flex'>
            <h4 className='text-[#5E5E5E] text-[16px] font-semibold leading-[17.36px]'>
              ISBN
            </h4>
            <span className='flex-grow mx-2 border-b border-dashed border-[#5E5E5E]'></span>
            <h4 className='text-secondary-black text-[16px] font-semibold leading-[17.36px]'>
              {book?.barcode}
            </h4>
          </li>
          <li className='flex'>
            <h4 className='text-[#5E5E5E] text-[16px] font-semibold leading-[17.36px]'>
              {t("book.year")}
            </h4>
            <span className='flex-grow mx-2 border-b border-dashed border-[#5E5E5E]'></span>
            <h4 className='text-secondary-black text-[16px] font-semibold leading-[17.36px]'>
              {book?.year}
            </h4>
          </li>
          <li className='flex'>
            <h4 className='text-[#5E5E5E] text-[16px] font-semibold leading-[17.36px]'>
              {t("book.language")}
            </h4>
            <span className='flex-grow mx-2 border-b border-dashed border-[#5E5E5E]'></span>
            <h4 className='text-secondary-black text-[16px] font-semibold leading-[17.36px]'>
              {book?.language}
            </h4>
          </li>
          <li className='flex'>
            <h4 className='text-[#5E5E5E] text-[16px] font-semibold leading-[17.36px]'>
              {t("book.pages")}
            </h4>
            <span className='flex-grow mx-2 border-b border-dashed border-[#5E5E5E]'></span>
            <h4 className='text-secondary-black text-[16px] font-semibold leading-[17.36px]'>
              {book?.numberOfPage}
            </h4>
          </li>
          <li className='flex'>
            <h4 className='text-[#5E5E5E] text-[16px] font-semibold leading-[17.36px]'>
              {t("book.cover")}
            </h4>
            <span className='flex-grow mx-2 border-b border-dashed border-[#5E5E5E]'></span>
            <h4 className='text-secondary-black text-[16px] font-semibold leading-[17.36px]'>
              {book?.cover[0].toUpperCase() + book?.cover?.slice(1)}
            </h4>
          </li>
        </ul>
      ) : (
        <ul className='flex flex-col gap-4 mt-4'>
          {Array.from({ length: 6 }).map((_: any, idx: number) => (
            <li key={idx}>
              <Skeleton className='w-full h-[30px] bg-skeleton-color' />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Actions;
