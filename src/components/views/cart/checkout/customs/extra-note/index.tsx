import { FC } from "react";
import Card from "../card";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setUserInfo } from "@/redux/slices/checkout";

const ExtraNote: FC = () => {
  const { userInfo } = useAppSelector(state => state.checkout)
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    dispatch(setUserInfo({...userInfo, extra_note: value }));
  };

  const { t } = useTranslation();
  return (
    <Card title={t("checkout.additional_note")}>
      <Textarea
        placeholder={t("checkout.note") + "..."}
        rows={6}
        className='resize-none text-[16px] font-semibold leading-[24px]'
        maxLength={500}
        value={userInfo.extra_note}
        onChange={handleInputChange}
      />
    </Card>
  );
};

export default ExtraNote;
