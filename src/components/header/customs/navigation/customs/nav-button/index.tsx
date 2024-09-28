import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface NavButtonPropsI {
	icon: string;
	label: string;
	alt: string;
	path: string;
}

const NavButton: FC<NavButtonPropsI> = ({ icon, label, alt, path }) => (
	<Button variant="secondary">
		<NavLink to={path} className="flex items-center">
			<img src={icon} alt={alt} />
			<span className="hidden sm:block ml-2">{label}</span>
		</NavLink>
	</Button>
);

export default NavButton;
