import { FC, useMemo } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { OrderI } from "@/types";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/helpers";

interface OrderCardProps {
  order: OrderI;
  index: number;
}
const OrderCard: FC<OrderCardProps> = ({ order, index }) => {
  const { t } = useTranslation();

  const statusStyles = useMemo(
    () =>
      classNames("px-2 py-1 rounded px-4", {
        "bg-[#CFFADB] hover:bg-[#CFFADB] text-[#05B001] hover:text-[#05B001]": order.status === "pending",
        "bg-[#C8DEF2] hover:bg-[#C8DEF2] text-[#107FE4] hover:text-[#107FE4]": order.status === "processing",
        "bg-[#E0D8F8] hover:bg-[#E0D8F8] text-[#875DFF] hover:text-[#875DFF]": order.status === "delivered",
        "bg-[#FFC0C0] hover:bg-[#FFC0C0] text-[#FF0000] hover:text-[#FF0000]": order.status === "canceled",
      }),
    [order.status]
  );

  return (
    <div className='py-5 px-4 bg-[#F6F6F6] rounded-[8px]'>
      <div className='flex items-center justify-between gap-4'>
        <h3 className='text-[18px] font-semibold leading-[21.78px] text-secondary-black'>
          {t("profile.orders.order")} № {index + 1}
        </h3>
        <time className='text-[16px] font-medium leading-[19.36px] text-secondary-black'>
          {formatDate(order.createdAt)}
        </time>
      </div>
      <div className='mt-4 flex items-center justify-between gap-4'>
        <Button className={statusStyles}>
          {t(`profile.orders.${order.status}`)}
        </Button>
        <strong>
          {formatPrice(order.price)} {t("profile.orders.sum")}
        </strong>
      </div>
    </div>
  );
};

export default OrderCard;
