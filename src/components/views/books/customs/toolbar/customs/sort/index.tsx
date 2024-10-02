import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import classNames from "classnames";
import useSearchParamsHook from "@/hooks/useSearchParams";

const Sort: FC = () => {
	const { t } = useTranslation();
	const { setParam, removeParam, getParam } = useSearchParamsHook();
	const [selectedSort, setSelectedSort] = useState<string>("saralash");

	// Load the current sort value from the URL search parameters
	useEffect(() => {
		const sort = getParam("sort") as string;
		if (sort) {
			setSelectedSort(sort);
		}
	}, [getParam("sort")]);

	const handleSortChange = (sortText: string) => {
		if (sortText === "saralash") {
			removeParam("sort");
		} else if (sortText === "yangi-kitoblar") {
			setParam("sort", "createdAt");
			setParam("asc", String(-1));
		} else if (sortText === "arzonroq") {
			setParam("sort", "fromPrice");
			setParam("asc", String(1));
		} else if (sortText === "qimmatroq") {
			setParam("sort", "fromPrice");
			setParam("asc", String(-1));
		} else if (sortText === "reytingi-yuqori") {
			setParam("sort", "rating");
			setParam("asc", String(-1));
		}
		setSelectedSort(sortText);
	};

	return (
		<Select onValueChange={handleSortChange} value={selectedSort}>
			<SelectTrigger className="w-[150px] sm:w-[170px] text-blue">
				<SelectValue
					defaultValue={getParam("sort") as string}
					placeholder={t("books.sort_by")}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectItem
					value="saralash"
					className={classNames({
						"text-blue bg-secondary-blue": selectedSort === "saralash",
					})}
				>
					{t("books.sort_by")}
				</SelectItem>
				<SelectItem
					value="yangi-kitoblar"
					className={classNames({
						"text-blue": selectedSort === "yangi-kitoblar",
					})}
				>
					{t("books.new_books")}
				</SelectItem>
				<SelectItem
					value="arzonroq"
					className={classNames({
						"text-blue": selectedSort === "arzonroq",
					})}
				>
					{t("books.cheaper")}
				</SelectItem>
				<SelectItem
					value="qimmatroq"
					className={classNames({
						"text-blue": selectedSort === "qimmatroq",
					})}
				>
					{t("books.more_expensive")}
				</SelectItem>
				<SelectItem
					value="reytingi-yuqori"
					className={classNames({
						"text-blue": selectedSort === "reytingi-yuqori",
					})}
				>
					{t("books.reyting")}
				</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default Sort;
