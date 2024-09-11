import type React from "react";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";

import logoIcon from "@/assets/icons/logo.svg";
import menuIcon from "@/assets/icons/menu.svg";
import searchIcon from "@/assets/icons/search.svg";

import Locale from "@/components/common/locale";
import { useAppDispatch } from "@/hooks/useRedux";
import { toggleMenuModalVisibility } from "@/redux/slices/modals";
import { HelpLink, SocialLinks } from "./customs";

const TopBar: React.FC = () => {
	const dispatch = useAppDispatch();

	// Memoizing the handler to prevent unnecessary re-renders
	const handleMenuClick = useCallback(() => {
		dispatch(toggleMenuModalVisibility(true));
	}, [dispatch]);

	return (
		<div
			id="top-bar"
			className="flex justify-between items-end pb-[16px] border-b border-b-[#d9d9d9]"
		>
			<div className="flex items-end gap-5 lg:gap-6">
				{/* Logo */}
				<NavLink to="/" className="w-16 h-11">
					<img src={logoIcon} alt="Book.uz logo" className="object-cover" />
				</NavLink>

				{/* Tagline */}
				<p className="hidden sm:block text-black text-lg lg:text-xl italic font-normal mr-5 lg:mr-10">
					Kitob – eng yaxshi sovg'a
				</p>

				{/* Help Link */}
				<HelpLink className="hidden lg:block" />
			</div>

			<div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
				{/* Search Icon */}
				<img src={searchIcon} alt="Search" />

				{/* Locale Component */}
				{/* <div className="hidden sm:block"> */}
				<Locale />
				{/* </div> */}

				{/* Contact Link */}
				<a
					href="tel:+998 99 111 11 11"
					className="hidden lg:block whitespace-nowrap text-[16px] font-medium text-black"
				>
					+998 99 111 11 11
				</a>

				{/* Social Links */}
				<div className="hidden lg:block">
					<SocialLinks />
				</div>

				{/* Menu Icon for Mobile */}
				<img
					src={menuIcon}
					alt="Open Menu"
					className="block lg:hidden cursor-pointer"
					onClick={handleMenuClick}
					onKeyDown={(event) => {
						if (event.key === "Enter" || event.key === " ") {
							handleMenuClick();
						}
					}}
				/>
			</div>
		</div>
	);
};

export default TopBar;
