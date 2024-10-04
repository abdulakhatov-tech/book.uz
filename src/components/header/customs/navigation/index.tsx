import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { LuUser2 } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";

import menuIcon from "@/assets/icons/menu-blue.svg";
import closeIcon from "@/assets/icons/close-blue.svg";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleCategoryDropdownVisibility } from "@/redux/slices/modals";
import { CategoryDropdown, CategoryNavigation, NavButton } from "./customs";

const HeaderNavigation: FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const categoryDropdownVisibility = useAppSelector(
		(state) => state.modal.categoryDropdownVisibility,
	);
	const wishlist = useAppSelector(state=>state.wishlist.bookmark)

	const handleCategoryDropdown = () => {
		dispatch(toggleCategoryDropdownVisibility(!categoryDropdownVisibility));
	};

	return (
		<div className="mt-2 md:mt-3 lg:mt-4 flex items-center justify-between gap-4">
			{/* Mobile Menu Button */}
			<CategoryDropdown>
				<Button
					onClick={handleCategoryDropdown}
					className="flex gap-2 lg:hidden bg-secondary-blue hover:bg-secondary-blue text-blue cursor-pointer "
					aria-label="Open Categories"
				>
					<img
						src={categoryDropdownVisibility ? closeIcon : menuIcon}
						alt={
							categoryDropdownVisibility
								? "Close categories menu"
								: "Open categories menu"
						}
						className="w-[20px]"
					/>
					<span className="hidden sm:block text-[14px] md:text-[16px] font-semibold">
						{t("header.categories")}
					</span>
				</Button>
			</CategoryDropdown>

			{/* Category Navigation for larger screens */}
			<CategoryNavigation className="hidden lg:flex items-center gap-9" />

			{/* Right-side Icons */}
			<div className="flex items-center gap-2 sm:gap-4 md:gap-6">
				<NavButton
					Icon={FaShoppingBasket}
					label={t("header.basket")}
					path="/cart"
				/>
				<NavButton
					Icon={IoMdHeartEmpty }
					label={t("header.favourites")}
					path="/bookmark"
					count={wishlist?.length || 0}
				/>
				<NavButton
					Icon={LuUser2 }
					label={t("header.profile")}
					path="/profile"
				/>
			</div>
		</div>
	);
};

export default HeaderNavigation;
