import React from "react";
import { useTranslation } from "react-i18next";
import { PiBooksLight } from "react-icons/pi";

const MoreBooks: React.FC<{ onClick: any; title?: string }> = ({
	onClick,
	title,
}) => {
	const { t } = useTranslation();

	return (
		<div
			onClick={onClick}
			className="bg-[#DADADA] h-full hover:opacity-90 active:opacity-1 active:scale-[0.99] active:transition-all custom-shadow rounded-[8px] flex flex-col items-center justify-center"
		>
			<PiBooksLight className="text-[72px] text-[#989898]" />
			<h4 className="text-[16px] md:text-[18px] font-semibold text-[#989898] mt-2">
				{title ? title : t("home.new_age_library.more_books")}
			</h4>
		</div>
	);
};

export default MoreBooks;
