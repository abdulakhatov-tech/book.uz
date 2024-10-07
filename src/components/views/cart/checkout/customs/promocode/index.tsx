import { FC } from "react";
import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { MdDone } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Card from "../card";
import LoadingSpinner from "@/tools/loading-spinner";
import useCouponCodeFeatures from "./features";

const Promocode: FC = () => {
  const { t } = useTranslation();
  const {
    coupon,
    couponCode,
    handleChange,
    applyCoupon,
    handleApplyCoupon,
    handleKeyDown,
  } = useCouponCodeFeatures();

  return (
    <Card title={t("checkout.coupon_code")}>
      <div className='flex items-center gap-4'>
        <Input
          value={coupon}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='max-w-[300px]'
          required
          disabled={!!couponCode}
        />
        <Button
          onClick={handleApplyCoupon}
          type='button'
          className='bg-orange hover:bg-orange'
          disabled={!!couponCode || applyCoupon.status === "pending"}
        >
          {applyCoupon.status === "pending" ? (
            <LoadingSpinner />
          ) : couponCode ? (
            <>
              <MdDone className='text-[22px] mr-1' />
              {t("checkout.coupon_code_applied")}
            </>
          ) : (
            t("checkout.use_promo_code")
          )}
        </Button>
      </div>

      <p className='mt-2 text-secondary-black font-normal text-[16px]'>
        {applyCoupon.isError ? (
          <span className='text-red-500'>
            {applyCoupon?.error && isAxiosError(applyCoupon.error)
              ? applyCoupon.error.response?.data?.message ||
                "Something went wrong!"
              : "Something went wrong!"}
          </span>
        ) : couponCode ? (
          <>
            {t("checkout.coupon_code_applied_message")}{" "}
            <strong>{couponCode}%</strong>{" "}
            {t("checkout.coupon_code_discount_message")}
          </>
        ) : (
          ""
        )}
      </p>
    </Card>
  );
};

export default Promocode;
