import React, { useCallback } from "react";

import menuIcon from "@/assets/icons/menu.svg";
import logoIcon from "@/assets/icons/logo.svg";
import searchIcon from "@/assets/icons/search.svg";

import Locale from "@/components/common/locale";
import { useAppDispatch } from "@/hooks/useRedux";
import { HelpLink, SocialLinks } from "./customs";
import { toggleMenuModalVisibility } from "@/redux/slices/modals";

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();

  // Memoizing the handler to prevent unnecessary re-renders
  const handleMenuClick = useCallback(() => {
    dispatch(toggleMenuModalVisibility(true));
  }, [dispatch]);

  return (
    <div id='top-bar' className='flex justify-between items-end pb-[16px] border-b border-b-[#d9d9d9]'>
      <div className='flex items-center gap-5 lg:gap-6'>
        {/* Logo */}
        <div className='w-16 h-11'>
          <img src={logoIcon} alt='Book.uz logo' className='object-cover' />
        </div>

        {/* Tagline */}
        <p className='hidden sm:block text-black text-lg lg:text-xl italic font-normal mr-5 lg:mr-10'>
          Kitob – eng yaxshi sovg'a
        </p>

        {/* Help Link */}
        <HelpLink className='hidden lg:block' />
      </div>

      <div className='flex items-center gap-3 sm:gap-4 lg:gap-5'>
        {/* Search Icon */}
        <img src={searchIcon} alt='Search' role='button' />

        {/* Locale Component */}
        <Locale />

        {/* Contact Link */}
        <a
          href='tel:+998712756484'
          className='hidden lg:block whitespace-nowrap text-lg font-medium text-black'
        >
          +998 71 275 64 84
        </a>

        {/* Social Links */}
        <div className='hidden lg:block'>
          <SocialLinks />
        </div>

        {/* Menu Icon for Mobile */}
        <img
          src={menuIcon}
          alt='Open Menu'
          role='button'
          className='block lg:hidden cursor-pointer'
          onClick={handleMenuClick}
        />
      </div>
    </div>
  );
};

export default TopBar;
