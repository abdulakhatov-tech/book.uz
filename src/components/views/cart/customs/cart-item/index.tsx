import { FC } from "react";
import { Link } from "react-router-dom";
import { BookI, CartItemI } from "@/types";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

import { IoMdHeartEmpty } from "react-icons/io";
import { FiPlus, FiMinus } from "react-icons/fi";
import noImage from "@/assets/images/no-image.jpg";
import { FaHeart, FaRegTrashAlt } from "react-icons/fa";

import { formatPrice } from "@/helpers";
import useCartItemFeatures from "./features";

const CartItem: FC<{ book: CartItemI | BookI }> = ({ book }) => {
  const { t } = useTranslation();
  const {
    isBookInWishlist,
    handleWishlist,
    handleRemoveFromCart,
    incrementBookAmountHandler,
    decrementBookAmountHandler,
  } = useCartItemFeatures({ book });

  return (
    <div className='bg-[#F6F6F6] px-2 sm:px-4 md:px-6 py-3 sm:py-4 rounded-[8px]'>
      <div className='grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-4 md:gap-6'>
        <Link to={`/books/details/${book._id}`}>
          <div className='w-full h-[150px] rounded-[8px] overflow-hidden'>
            <img
              src={book?.imgUrl || noImage}
              alt={book?.name}
              loading='lazy'
              className='w-full h-full object-cover aspect-[8/7] hover:scale-[1.02]'
            />
          </div>
        </Link>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4'>
          <div>
            <h4 className='text-[16px] sm:text-[18px] md:text-[20px] font-semibold leading-[28px] text-secondary-black max-w-[422px]'>
              {book?.name}
            </h4>
            <p className='text-[14px] md:text-[16px] font-normal leading-[22.4px] text-gray md:mt-2'>
              {t("cart.price")}: {formatPrice(book?.bookPrice)} {t("cart.sum")}
            </p>

            <div className='flex items-center flex-wrap md:flex-nowrap gap-2 mt-2 md:mt-4'>
              <Button
                onClick={handleWishlist}
                className='px-2 h-[30px] md:h-auto md:px-3 bg-[#FCE5D1] hover:bg-[#FCE5D1] text-orange text-[12px] md:text-[14px] font-semibold flex items-center gap-1 md:gap-[6px]'
              >
                {isBookInWishlist ? (
                  <FaHeart className='text-[16px] md:text-[18px] text-orange' />
                ) : (
                  <IoMdHeartEmpty className='text-[16px] md:text-[18px]' />
                )}
                {t("cart.favourites")}
              </Button>

              <Button
                onClick={handleRemoveFromCart}
                variant={"ghost"}
                className='px-2 h-[30px] md:h-auto md:px-3 hover:text-gray text-gray text-[14px] font-semibold flex items-center gap-1 md:gap-[6px]'
              >
                <FaRegTrashAlt className='text-[14px]' />
                {t("cart.delete")}
              </Button>
            </div>
          </div>
          <div className='h-full flex md:flex-col flex-row-reverse justify-between  items-start md:items-end gap-2 md:gap-4 flex-wrap md:flex-nowrap'>
            <h4 className='text-[18px] sm:text-[20px] md:text-[24px] font-semibold leading-[29.26px] text text-secondary-black'>
              {formatPrice(book?.bookPrice * book?.amount)}{" "}
              <span className='text-[16px] font-normal leading-[19.5px]'>
                {t("cart.sum")}
              </span>
            </h4>
            <Button className='px-3 bg-white hover:bg-white rounded-[12px] flex items-center gap-2 md:gap-3'>
              <span
                onClick={decrementBookAmountHandler}
                className='bg-secondary-blue w-[26px] md:w-[30px] h-[26px] md:h-[30px] rounded-full flex items-center justify-center'
              >
                <FiMinus className='text-blue text-[16px] md:text-[18px]' />
              </span>
              <span className='text-blue w-[28px] md:w-[40px] text-[14px] md:text-[16px] font-semibold leading-[19.5px]'>
                {book?.amount || 0}
              </span>
              <span
                onClick={incrementBookAmountHandler}
                className='bg-secondary-blue w-[26px] md:w-[30px] h-[26px] md:h-[30px] rounded-full flex items-center justify-center'
              >
                <FiPlus className='text-blue text-[16px] md:text-[18px]' />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
