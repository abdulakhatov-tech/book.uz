import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Skeleton } from "@/components/ui/skeleton";

import Section from "@/layout/section";
import { OrderI, UserI } from "@/types";
import useOrdersService from "@/services/orders";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { Actions, LoadingSkeleton, OrderCard } from "./customs";

const ProfileOrders: FC = () => {
  const { t } = useTranslation();
  const user = useAuthUser<UserI>();
  const isOnline = useOnlineStatus();
  const [activeStatus, setActiveStatus] = useState<
    "all" | "pending" | "processing" | "delivered" | "canceled"
  >("all");

  const { useGetUserOrders } = useOrdersService();
  const {
    isLoading,
    isError,
    data: ordersData,
  } = useGetUserOrders(user?._id || "");

  const loading = isLoading || isError || !isOnline;
  const filteredOrders = useMemo(
    () =>
      ordersData?.filter(
        (order: OrderI) =>
          activeStatus === "all" || order.status === activeStatus
      ) ?? [],
    [ordersData, activeStatus]
  );

  return (
    <Section id='settings'>
      <h2 className='text-[24px] font-semibold leading-[29.26px] text-black mb-6'>
        {t("profile.orders.title")}
      </h2>

      {/* Order status buttons */}
      {loading ? (
        <div className='flex items-center gap-2 flex-wrap'>
          <Skeleton className='w-[60px] h-[35px] bg-skeleton-color' />
          <Skeleton className='w-[100px] h-[35px] bg-skeleton-color' />
          <Skeleton className='w-[120px] h-[35px] bg-skeleton-color' />
          <Skeleton className='w-[120px] h-[35px] bg-skeleton-color' />
          <Skeleton className='w-[110px] h-[35px] bg-skeleton-color' />
        </div>
      ) : (
        <Actions
          setActiveStatus={setActiveStatus}
          activeStatus={activeStatus}
        />
      )}

      <hr className='my-4' />

      {/* Orders List */}
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {loading ? (
          <LoadingSkeleton />
        ) : filteredOrders?.length ? (
          filteredOrders.map((order: OrderI, idx: number) => (
            <OrderCard key={order._id} order={order} index={idx} />
          ))
        ) : (
          <strong className='col-span-3 text-center py-4'>No orders yet</strong>
        )}
      </div>
    </Section>
  );
};

export default ProfileOrders;
