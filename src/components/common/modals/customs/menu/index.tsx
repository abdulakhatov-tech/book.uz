import type { FC } from "react";
import { NavLink } from "react-router-dom";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

import closeIcon from "@/assets/icons/close.svg";
import logoIcon from "@/assets/icons/logo.svg";
import phoneIcon from "@/assets/icons/phone.svg";

import {
	HelpLink,
	SocialLinks,
} from "@/components/header/customs/topbar/customs";
import useMenuModalVisibilityFeatures from "./features";
import { CategoryNavigation } from "@/components/header/customs/navigation/customs";

const MenuModalVisibility: FC = () => {
	const { handleCloseSidebar, handleOnKeyDown, menuModalVisibility } =
		useMenuModalVisibilityFeatures();

	return (
		<Sheet open={menuModalVisibility} onOpenChange={handleCloseSidebar}>
			<SheetContent>
				<SheetHeader className="flex flex-col gap-2">
					{/* Header with Logo and Close Button */}
					<SheetTitle className="flex items-center justify-between pb-3 border-b border-b-borderColor">
						<div className="flex items-center gap-6">
							<NavLink to="/" className="w-14 md:w-16">
								<img
									src={logoIcon}
									alt="Book.uz logo"
									className="w-full h-full object-cover"
								/>
							</NavLink>
						</div>

						<img
							src={closeIcon}
							alt="Close menu"
							className="cursor-pointer"
							onClick={handleCloseSidebar}
							onKeyDown={handleOnKeyDown}
						/>
					</SheetTitle>

					{/* Contact Information */}
					<div className="flex items-center justify-between gap-4 flex-wrap">
						<a
							href="tel:+998 99 111 11 11"
							className="flex items-center gap-2 text-[14px] font-semibold text-blue"
						>
							<img src={phoneIcon} alt="Phone icon" />
							+998 99 111 11 11
						</a>
						<SocialLinks />
					</div>

					{/* Help and Category Navigation */}
					<HelpLink className="block text-left cursor-pointer" />
					<CategoryNavigation className="flex flex-col items-start gap-3 mt-[20px]" />
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default MenuModalVisibility;
