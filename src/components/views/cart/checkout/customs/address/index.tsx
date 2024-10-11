import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Card from "../card";
import { setUserInfo } from "@/redux/slices/checkout";
import { SelectDistricts, SelectRegions } from "./customs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const Address: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.checkout);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const extraAddress = e.target.value;
    dispatch(
      setUserInfo({
        billingAddress: {
          ...userInfo.billingAddress,
          extraAddress,
        },
      })
    );
  };

  return (
    <Card title={t("checkout.address")}>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
        <SelectRegions />
        <SelectDistricts />
        <div className='md:col-span-1'>
          <Label
            htmlFor='address'
            className='text-[16px] font-semibold leading-[19.36px] text-[#828282]'
          >
            {t("checkout.district")}
          </Label>
          <Input
            id='address'
            placeholder={"Amir Temur ko'chasi, 12-uy"}
            className='mt-2 font-semibold'
            value={userInfo?.billingAddress?.extraAddress}
            onChange={handleAddressChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default Address;
