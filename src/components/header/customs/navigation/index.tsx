import type React from "react";
import { Button } from "@/components/ui/button";

import menuIcon from "@/assets/icons/menu-blue.svg";
import basketIcon from "@/assets/icons/basket.svg";
import heartIcon from "@/assets/icons/heart.svg";
import userIcon from "@/assets/icons/user.svg";

import { CategoryNavigation } from "./customs";
import { NavLink } from "react-router-dom";

// Reusable Button component for Nav
const NavButton: React.FC<{
  icon: string;
  label: string;
  alt: string;
  path: string;
}> = ({ icon, label, alt, path }) => (
  <Button variant='secondary'>
    <NavLink to={path} className='flex items-center'>
      <img src={icon} alt={alt} />
      <span className='hidden sm:block ml-2'>{label}</span>
    </NavLink>
  </Button>
);

const HeaderNavigation: React.FC = () => {
  return (
    <div className='py-3 flex items-center justify-between gap-4'>
      {/* Mobile Menu Button */}
      <Button
        className='flex gap-2 lg:hidden bg-[#107fe419] text-[#107fe4]'
        aria-label='Open Categories'
      >
        <img src={menuIcon} alt='Open categories menu' />
        <span className='hidden sm:block'>Categories</span>
      </Button>

      {/* Category Navigation for larger screens */}
      <CategoryNavigation className='hidden lg:flex items-center gap-9' />

      {/* Right-side Icons */}
      <div className='flex items-center gap-2 sm:gap-4 md:gap-6'>
        <NavButton
          icon={basketIcon}
          label='Savatcha'
          path='/cart'
          alt='Basket icon'
        />
        <NavButton
          icon={heartIcon}
          label='Sevimlilar'
          path='/bookmark'
          alt='Heart icon'
        />
        <NavButton
          icon={userIcon}
          label='Profil'
          path='/profile'
          alt='User profile icon'
        />
      </div>
    </div>
  );
};

export default HeaderNavigation;
