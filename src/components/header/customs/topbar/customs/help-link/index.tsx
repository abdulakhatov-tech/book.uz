import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface HelpLinkPropsI {
	className?: string;
}

const HelpLink: FC<HelpLinkPropsI> = ({ className = "" }) => {
	const { t } = useTranslation();

	return (
		<div className={className}>
			<NavLink
				to="/"
				aria-label="How to purchase guide"
				className="text-[16px] font-normal text-[#6A6A6A] underline"
			>
				{t("header.how_to_purchase")}?
			</NavLink>
		</div>
	);
};

export default HelpLink;
