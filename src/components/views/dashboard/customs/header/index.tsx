import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { IoMdLogOut } from "react-icons/io";
import { RiIndentDecrease, RiIndentIncrease } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toggleSidebar } from "@/redux/slices/sidebar";
import { Button } from "@/components/ui/button";
import Locale from "@/components/common/locale";
import logo from "@/assets/icons/logo.svg";
import { UserI } from "@/types";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user: UserI | null = useAuthUser();
	const { isOpen } = useAppSelector((state) => state.sidebar);

	const handleToggle = () => {
		dispatch(toggleSidebar());
	};

	// Safely handle user role or fallback to "Admin"
	const userRole = user?.role
		? `${user.role[0].toUpperCase() + user.role.slice(1)}`
		: "Admin";

	return (
		<header className="bg-[#001529]">
			<div
				className={classNames(
					"w-full grid h-[60px] transition-all duration-300",
					{
						"grid-cols-[250px_1fr]": !isOpen,
						"grid-cols-[80px_1fr]": isOpen,
					},
				)}
			>
				<div className="flex items-center justify-center gap-4 px-2">
					<Link to="/dashboard">
						<img src={logo} alt="logo" className="max-w-[50px]" />
					</Link>
					{!isOpen && (
						<h4 className="text-[24px] text-white font-normal font-sans mr-[65px]">
							{userRole}
						</h4>
					)}
				</div>
				<div className="flex items-center justify-between px-6">
					{isOpen ? (
						<RiIndentIncrease
							className="text-[26px] text-white"
							onClick={handleToggle}
						/>
					) : (
						<RiIndentDecrease
							className="text-[26px] text-white"
							onClick={handleToggle}
						/>
					)}

					<div className="flex items-center gap-4">
						<Link to='/'>
							<FaHome className="text-[24px] text-white" />
						</Link>
						<Locale className="h-[38px] w-[60px] px-2" />
						<Button variant={"destructive"} className="flex items-center gap-2">
							{t("dashboard.sidebar.logout")}{" "}
							<IoMdLogOut className="text-[22px] font-bold" />
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
