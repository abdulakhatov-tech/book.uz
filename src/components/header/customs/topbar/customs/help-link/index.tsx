import type React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const HelpLink: React.FC<{ className: string }> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<nav className={className}>
			<NavLink
				to="/"
				aria-label="How to purchase guide"
				className="text-[16px] font-normal text-[#6A6A6A] underline"
			>
				{t('header.how_to_purchase')}?
			</NavLink>
		</nav>
	);
};

export default HelpLink;
