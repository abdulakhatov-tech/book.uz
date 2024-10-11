import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface NavButtonPropsI {
	Icon: any;
	label: string;
	path: string;
	count?: number;
}

const NavButton: FC<NavButtonPropsI> = ({ Icon, label, path, count }) => (
	<Button
		variant="secondary"
		className="relative bg-[#F0F0F0] hover:bg-orange hover:text-white p-3 sm:p-auto"
	>
		<NavLink to={path} className="flex items-center">
			<Icon className="text-[20px]" />
			<span className="hidden lg:block ml-2">{label}</span>
			{count && count > 0 ? (
				<span className="border-white border-[2px] absolute -top-3 -right-3 px-3 max-w-9 h-[26px] rounded-full bg-orange text-white text-[14px] flex items-center justify-center">
					{count < 10 ? count : `9+`}
				</span>
			) : (
				""
			)}
		</NavLink>
	</Button>
);

export default NavButton;
