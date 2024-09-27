import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logoIcon from "@/assets/icons/logo.svg";
import menuIcon from "@/assets/icons/menu.svg";
import searchIcon from "@/assets/icons/search.svg";

import useTopBarFeatures from "./features";
import Locale from "@/components/common/locale";
import { HelpLink, SocialLinks } from "./customs";

const TopBar: FC = () => {
	const { t } = useTranslation();
	const { handleMenuClick, handleOnKeyDown } = useTopBarFeatures();

	return (
		<div
			id="top-bar"
			className="flex justify-between items-end pb-[16px] border-b border-b-borderColor"
		>
			<div className="flex items-end gap-5 lg:gap-6">
				{/* Logo */}
				<NavLink to="/" className="w-14 md:w-16">
					<img
						src={logoIcon}
						alt="Book.uz logo"
						className="w-full h-full object-cover"
					/>
				</NavLink>

				{/* Tagline */}
				<p className="hidden sm:block text-black text-lg lg:text-xl font-normal mr-5 lg:mr-10 italic">
					{t("header.book_is_best_prize")}
				</p>

				{/* Help Link */}
				<HelpLink className="hidden lg:block" />
			</div>

			<div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
				<img src={searchIcon} alt="Search" className="w-[18px] h-[18px]" />
				<Locale />

				{/* Contact Link */}
				<a
					href="tel:+998 99 111 11 11"
					className="hidden lg:block whitespace-nowrap text-[18px] font-medium text-black"
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
					onKeyDown={handleOnKeyDown}
				/>
			</div>
		</div>
	);
};

export default TopBar;
