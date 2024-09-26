import React from "react";
import { useTranslation } from "react-i18next";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { SelectPushlishedYearPropsI } from "./interface";

const currentYear = new Date().getFullYear();
const years = Array.from(
	{ length: currentYear - 1900 + 1 },
	(_, index) => 1900 + index,
).reverse();

const SelectPushlishedYear: React.FC<SelectPushlishedYearPropsI> = ({
	value,
	onChange,
}) => {
	const { t } = useTranslation();

	const selectedValue = value.toString() || currentYear.toString();

	return (
		<Select
			value={selectedValue}
			onValueChange={(value) => onChange(value, "year")}
		>
			<SelectTrigger>
				<SelectValue placeholder={t("dashboard.books.select_year")} />
			</SelectTrigger>
			<SelectContent className="max-h-[400px]">
				{years.map((year) => (
					<SelectItem value={year.toString()} key={year}>
						{year}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SelectPushlishedYear;
