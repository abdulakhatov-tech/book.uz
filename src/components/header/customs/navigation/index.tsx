import { Button } from "@/components/ui/button";
import type React from "react";

import basketIcon from "@/assets/icons/basket.svg";
import heartIcon from "@/assets/icons/heart.svg";
import menuIcon from "@/assets/icons/menu-blue.svg";
import userIcon from "@/assets/icons/user.svg";
import closeIcon from "@/assets/icons/close-blue.svg";

import { NavLink } from "react-router-dom";
import { CategoryDropdown, CategoryNavigation } from "./customs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleCategoryDropdownVisibility } from "@/redux/slices/modals";
import { useTranslation } from "react-i18next";

// Define types for NavButton props
interface NavButtonProps {
  icon: string;
  label: string;
  alt: string;
  path: string;
}

// Reusable Button component for Nav
const NavButton: React.FC<NavButtonProps> = ({ icon, label, alt, path }) => (
  <Button variant="secondary">
    <NavLink to={path} className="flex items-center">
      <img src={icon} alt={alt} />
      <span className="hidden sm:block ml-2">{label}</span>
    </NavLink>
  </Button>
);

const HeaderNavigation: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const categoryDropdownVisibility = useAppSelector(
    (state) => state.modal.categoryDropdownVisibility
  );

  const handleCategoryDropdown = () => {
    dispatch(toggleCategoryDropdownVisibility(!categoryDropdownVisibility));
  };

  return (
    <div className="py-3 flex items-center justify-between gap-4">
      {/* Mobile Menu Button */}
      <CategoryDropdown>
        <Button
          onClick={handleCategoryDropdown}
          className="flex gap-2 lg:hidden bg-[#45688819] text-[#107fe4]"
          aria-label="Open Categories"
        >
          <img
            src={categoryDropdownVisibility ? closeIcon : menuIcon}
            alt={
              categoryDropdownVisibility
                ? "Close categories menu"
                : "Open categories menu"
            }
          />
          <span className="hidden sm:block">{t('header.categories')}</span>
        </Button>
      </CategoryDropdown>

      {/* Category Navigation for larger screens */}
      <CategoryNavigation className="hidden lg:flex items-center gap-9" />

      {/* Right-side Icons */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <NavButton
          icon={basketIcon}
          label={t('header.basket')}
          path="/cart"
          alt="View shopping basket"
        />
        <NavButton
          icon={heartIcon}
          label={t('header.favourites')}
          path="/bookmark"
          alt="View favorites"
        />
        <NavButton
          icon={userIcon}
          label={t('header.profile')}
          path="/profile"
          alt="View user profile"
        />
      </div>
    </div>
  );
};

export default HeaderNavigation;
