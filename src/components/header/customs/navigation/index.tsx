import type { FC } from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Button } from "@/components/ui/button";

import { LuUser2 } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

import menuIcon from "@/assets/icons/menu-blue.svg";
import closeIcon from "@/assets/icons/close-blue.svg";

import { UserI } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleCategoryDropdownVisibility } from "@/redux/slices/modals";
import { CategoryDropdown, CategoryNavigation, NavButton } from "./customs";

const HeaderNavigation: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const categoryDropdownVisibility = useAppSelector(
    (state) => state.modal.categoryDropdownVisibility
  );
  const wishlist = useAppSelector((state) => state.wishlist.bookmark);
  const cart = useAppSelector((state) => state.cart.cart);
  const user = useAuthUser<UserI>();

  const handleCategoryDropdown = () => {
    dispatch(toggleCategoryDropdownVisibility(!categoryDropdownVisibility));
  };

  return (
    <div className='mt-2 md:mt-3 lg:mt-4 flex items-center justify-between gap-4'>
      {/* Mobile Menu Button */}
      <CategoryDropdown>
        <Button
          onClick={handleCategoryDropdown}
          className='flex gap-2 lg:hidden bg-secondary-blue hover:bg-secondary-blue text-blue cursor-pointer '
          aria-label='Open Categories'
        >
          <img
            src={categoryDropdownVisibility ? closeIcon : menuIcon}
            alt={
              categoryDropdownVisibility
                ? "Close categories menu"
                : "Open categories menu"
            }
            className='w-[20px]'
          />
          <span className='hidden sm:block text-[14px] md:text-[16px] font-semibold'>
            {t("header.categories")}
          </span>
        </Button>
      </CategoryDropdown>

      {/* Category Navigation for larger screens */}
      <CategoryNavigation className='hidden lg:flex items-center gap-9' />

      {/* Right-side Icons */}
      <div className='flex items-center gap-2 sm:gap-4 md:gap-6'>
        <NavButton
          Icon={FaShoppingBasket}
          label={t("header.basket")}
          path='/cart'
          count={cart?.length || 0}
        />
        <NavButton
          Icon={IoMdHeartEmpty}
          label={t("header.favourites")}
          path='/bookmark'
          count={wishlist?.length || 0}
        />
        <NavButton Icon={LuUser2} label={t("header.profile")} path='/profile' />
        {(user?.role === "owner" || user?.role === "admin") && (
          <NavButton
            Icon={MdOutlineDashboard}
            label={t("profile.nav.dashboard")}
            path='/dashboard'
          />
        )}
      </div>
    </div>
  );
};

export default HeaderNavigation;
