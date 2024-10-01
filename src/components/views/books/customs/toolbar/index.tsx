import type { FC } from "react";
import { useTranslation } from "react-i18next";

import Section from "@/layout/section";
import { ColumnCounter, Filter, Sort, ViewCounter } from "./customs";

const Toolbar: FC = () => {
	const { t } = useTranslation();

	return (
		<Section
			id="books-header"
			className="flex flex-col lg:flex-row lg:items-center justify-between"
		>
			<h2 className="text-[22px] md:text-[26px] lg:text-[28px] font-semibold leading-[34.13px] text-secondary-black">
				{t("books.title")}
			</h2>
			<div className="flex items-center justify-between mt-2 lg:mt-0">
				<Filter />
				<div className="flex items-center gap-4">
					<ViewCounter />
					<ColumnCounter />
					<Sort />
				</div>
			</div>
		</Section>
	);
};

export default Toolbar;
