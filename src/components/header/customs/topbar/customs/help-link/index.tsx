import type React from "react";
import { NavLink } from "react-router-dom";

const HelpLink: React.FC<{ className: string }> = ({ className }) => {
	return (
		<nav className={className}>
			<NavLink
				to="/"
				aria-label="How to purchase guide"
				className="text-[16px] font-normal text-[#6A6A6A] underline"
			>
				Qanday xarid qilinadi?
			</NavLink>
		</nav>
	);
};

export default HelpLink;
