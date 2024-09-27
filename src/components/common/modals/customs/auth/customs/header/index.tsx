import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logoIcon from "@/assets/icons/logo.svg";
import closeIcon from "@/assets/icons/close-blue.svg";

import useAuthFeatures from "../../features";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AuthHeader: FC = () => {
  const { t } = useTranslation();
  const { handleClose, authType } = useAuthFeatures();

  // Define title and description based on authType
  const title =
    authType === "sign-in"
      ? t("auth.sign_in_title")
      : authType === "sign-up"
      ? t("auth.sign_up_title")
      : t("auth.otp_title");

  const description =
    authType === "sign-in"
      ? t("auth.sign_in_description")
      : authType !== "sign-up" && t("auth.otp_description");

  return (
    <DialogHeader>
      <div className='flex items-start justify-between mb-2 md:mb-4'>
        <NavLink to='/' className='w-14 md:w-16'>
          <img
            src={logoIcon}
            alt='Book.uz logo'
            className='w-full h-full object-cover'
          />
        </NavLink>
        <img
          src={closeIcon}
          alt='Close'
          className='w-[20px] h-[20px] cursor-pointer'
          onClick={handleClose}
        />
      </div>

      <div className='flex flex-col gap-1 md:gap-3'>
        <DialogTitle className='text-[20px] md:text-[24px] font-semibold leading-[29px] text-black'>
          {title}
        </DialogTitle>

        {description && (
          <DialogDescription className='text-[14px] md:text-[16px] font-normal leading-[22px] text-[#5E5E5E]'>
            {description}
          </DialogDescription>
        )}
      </div>
    </DialogHeader>
  );
};

export default AuthHeader;
