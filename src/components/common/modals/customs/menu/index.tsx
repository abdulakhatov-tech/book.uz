import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleMenuModalVisibility } from "@/redux/slices/modals";

import logoIcon from "@/assets/icons/logo.svg";
import closeIcon from "@/assets/icons/close.svg";
import phoneIcon from "@/assets/icons/phone.svg";

import Locale from "@/components/common/locale";
import { HelpLink, SocialLinks } from "@/components/header/customs/topbar/customs";
import { CategoryNavigation } from "@/components/header/customs/navigation/customs";

const MenuModalVisibility: React.FC = () => {
  const { menuModalVisibility } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(toggleMenuModalVisibility(false));

  return (
    <Sheet open={menuModalVisibility} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-2">
          {/* Header with Logo and Close Button */}
          <SheetTitle className="flex items-center justify-between pb-3 border-b border-b-[#d9d9d9]">
            <div className="flex items-center gap-6">
              <img src={logoIcon} alt="Book.uz Logo" />
              <Locale />
            </div>
            <button onClick={onClose} aria-label="Close menu">
              <img src={closeIcon} alt="Close menu" />
            </button>
          </SheetTitle>

          {/* Contact Information */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:+998712756484"
              className="flex items-center gap-2 text-[14px] font-medium text-[#107fe4]"
            >
              <img src={phoneIcon} alt="Phone icon" />
              +998 71 275 64 84
            </a>
            <SocialLinks />
          </div>

          {/* Help and Category Navigation */}
          <HelpLink className="block" />
          <CategoryNavigation className="flex flex-col gap-3 mt-[20px]" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuModalVisibility;
