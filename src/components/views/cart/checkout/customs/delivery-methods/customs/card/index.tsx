import { FC, useEffect } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { TfiEmail } from "react-icons/tfi";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiHandWithdrawLight } from "react-icons/pi";

import { DeliveryMethodI } from "@/types";
import { setDelivery, setUserInfo } from "@/redux/slices/checkout";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const DeliveryItem: FC<{ method: DeliveryMethodI }> = ({ method }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.checkout);

  const { type } = method;
  const { delivery_method } = userInfo;

  const handleSelect = (delivery_method: "courier" | "pickup" | "postal") => {
    dispatch(setUserInfo({ ...userInfo, delivery_method }));
    dispatch(setDelivery(method?.value)); // Set the delivery method value
  };

  useEffect(() => {
    if (delivery_method === type) {
      dispatch(setDelivery(method?.value)); // Set when matches the type
    }
  }, [delivery_method, dispatch, method?.value, type]);

  return (
    <div
      className={classNames("p-5 rounded-[8px] cursor-pointer", {
        "bg-secondary-blue": delivery_method === type,
        "bg-secondary-gray": delivery_method !== type,
      })}
      onClick={() => handleSelect(type)}
    >
      <div className="flex items-center gap-2">
        {type === "courier" ? (
          <CiDeliveryTruck
            className={classNames("text-[26px]", {
              "text-blue": delivery_method === "courier",
              "text-[#5D5D5D]": delivery_method !== "courier",
            })}
          />
        ) : type === "pickup" ? (
          <PiHandWithdrawLight
            className={classNames("text-[26px]", {
              "text-blue": delivery_method === "pickup",
              "text-[#5D5D5D]": delivery_method !== "pickup",
            })}
          />
        ) : (
          <TfiEmail
            className={classNames("text-[22px]", {
              "text-blue": delivery_method === "postal",
              "text-[#5D5D5D]": delivery_method !== "postal",
            })}
          />
        )}

        <h4
          className={classNames("text-[16px] font-semibold leading-[19.36px]", {
            "text-blue": delivery_method === type,
            "text-secondary-black": delivery_method !== type,
          })}
        >
          {t(`checkout.${type}`)}
        </h4>
      </div>
      <p
        className={classNames("text-[14px] font-normal leading-[18.2px] mt-2", {
          "text-blue": delivery_method === type,
          "text-gray": delivery_method !== type,
        })}
      >
        {t(`checkout.${type}_description`)}
      </p>
    </div>
  );
};

export default DeliveryItem;
