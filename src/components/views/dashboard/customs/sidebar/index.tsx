import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

import { MockData } from "@/utils";
import { useAppSelector } from "@/hooks/useRedux";

const Sidebar: React.FC = () => {
	const { isOpen } = useAppSelector((state) => state.sidebar);

	const { dashboardSidebarNavigation } = MockData();
	return (
		<aside className="bg-[#001529] border-t-[#69686860] border-t-[1px] px-1 py-3">
			<nav>
				<ul className="flex flex-col gap-1">
					{dashboardSidebarNavigation.map(({ _id, path, Icon, label }) => (
						<li key={_id}>
							<NavLink
								to={path}
								className={({ isActive }) =>
									classNames(
										"w-full h-[40px] flex items-center gap-3 rounded-lg px-6 font-sans hover:text-white hover:bg-[#BC8E5B] hover:font-medium",
										{
											"bg-[#BC8E5B] font-medium text-white": isActive,
											"text-[#A6ADB4]": !isActive,
										},
									)
								}
							>
								<Icon
									className={classNames({
										"text-[22px]": isOpen,
										"text-[20px]": !isOpen,
									})}
								/>
								{!isOpen && <span className="text-[16px]">{label}</span>}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
