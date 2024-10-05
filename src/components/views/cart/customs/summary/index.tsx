import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { FaShoppingBasket } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";

import { formatPrice } from "@/helpers";
import useSummaryFeatures from "./features";
import { LoadingSkeleton } from "./customs";
import LoadingSpinner from "@/tools/loading-spinner";

const Summary: FC = () => {
  const { t } = useTranslation();
  const {
    delivery,
    discount,
    isLoading,
    totalBooks,
    totalPrice,
    loadingCheckout,
    checkoutHandler,
    totalPriceWithDiscount,
  } = useSummaryFeatures();

  return (
    <div>
      {isLoading ?  (
        <LoadingSkeleton />
      ) : (
        <div className='bg-secondary-gray py-4 px-4 rounded-[8px] h-fit min-h-[198px]'>
          <h4 className='text-[16px] md:text-[18px] font-semibold leading-[21.94px] text-secondary-black'>
            {t("cart.your_order")}
          </h4>

          <ul className='mt-4 flex flex-col gap-4'>
            <li className='flex'>
              <h5 className='text-[14px] md:text-[16px] font-medium leading-[12.36px] text-gray'>
                {t("cart.books")} ({totalBooks})
              </h5>
              <span className='flex-grow mx-2 border-b border-dashed border-[#cbcbcb]'></span>
              <h5 className='text-[14px] md:text-[16px] font-semibold leading-[12.36px] text-secondary-black'>
                {formatPrice(totalPrice)} {t("cart.sum")}
              </h5>
            </li>
            <li className='flex'>
              <h5 className='text-[14px] md:text-[16px] font-medium leading-[12.36px] text-gray'>
                {t("cart.delivery")}
              </h5>
              <span className='flex-grow mx-2 border-b border-dashed border-[#cbcbcb]'></span>
              <h5 className='text-[14px] md:text-[16px] font-semibold leading-[12.36px] text-secondary-black'>
                {formatPrice(delivery)} {t("cart.sum")}
              </h5>
            </li>
            <li className='flex'>
              <h5 className='text-[14px] md:text-[16px] font-medium leading-[12.36px] text-gray'>
                {t("cart.discount")}
              </h5>
              <span className='flex-grow mx-2 border-b border-dashed border-[#cbcbcb]'></span>
              <h5 className='text-[14px] md:text-[16px] font-semibold leading-[12.36px] text-secondary-black'>
                {formatPrice(discount)} {t("cart.sum")}
              </h5>
            </li>

            <span className='flex-grow border-b-[1px] border-b-[#cbcbcb] my-1' />

            <li className='flex'>
              <h5 className='text-[14px] md:text-[16px] font-bold leading-[12.36px] text-gray'>
                {t("cart.total")}
              </h5>
              <span className='flex-grow mx-2 border-b border-dashed border-[#cbcbcb]'></span>
              <h5 className='text-[14px] md:text-[16px] font-semibold leading-[12.36px] text-secondary-black'>
                {formatPrice(totalPriceWithDiscount)} {t("cart.sum")}
              </h5>
            </li>
          </ul>
        </div>
      ) }

      <div className='mt-4 flex flex-col gap-2 text-[16px] font-medium leading-[24px] text-white'>
        <Button
          onClick={checkoutHandler}
          className='flex items-center gap-2 w-full bg-orange hover:bg-orange '
        >
            {
                loadingCheckout ? <LoadingSpinner /> : <><FaShoppingBasket className='text-[16px]' />
          {t("cart.purchase")}</>
            }
          
        </Button>
        <Link to={isLoading ? "/cart" : "/books?page=1&limit=9"}>
          <Button
            variant='outline'
            className='flex items-center gap-2 w-full bg-white hover:bg-white hover:text-secondary-black text-secondary-black  text-[16px] font-medium leading-[24px]'
          >
            <MdShoppingCartCheckout className='text-[16px]' />
            {t("cart.continue_shopping")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Summary;
