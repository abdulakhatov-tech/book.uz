import { FC } from "react";
import { useTranslation } from "react-i18next";

import { BookI } from "@/types";
import { formatPrice } from "@/helpers";

import { ActionButtons, RenderImages } from "./customs";

const ProductCard: FC<{ book: BookI; noSlide?: boolean }> = ({
  book,
  noSlide,
}) => {
  const { t } = useTranslation();
  const { imgUrl, additionalImages, author, name, bookPrice, discount } = book;

  return (
    <div className='custom-shadow p-2 rounded-[8px]  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-50'>
      <div className='relative max-h-[240px] sm:max-h-[245px] w-full overflow-hidden rounded-[6px]'>
        <RenderImages
          imgUrl={imgUrl}
          author={author}
          additionalImages={additionalImages}
          noSlide={noSlide}
        />
        {discount ? (
          <span className='absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg cursor-pointer'>
            {discount}% OFF
          </span>
        ) : (
          ""
        )}
        <ActionButtons book={book} />
      </div>
      <div className='py-[10px]'>
        <h3 className='text-[16px] md:text-[18px] font-semibold leading-[21.78px] text-black truncate'>
          {name}
        </h3>
        <h4 className='text-[12px] md:text-[14px] font-normal leading-[16.94px] text-gray mt-[6px] mb-[8px] truncate'>
          {author.fullName}
        </h4>
        <h3 className='text-[16px] md:text-[18px] font-semibold leading-[24.38px] text-orange'>
          {formatPrice(bookPrice)} {t("home.new_arrivals.currency")}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
