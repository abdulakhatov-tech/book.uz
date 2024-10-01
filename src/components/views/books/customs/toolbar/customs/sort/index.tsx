import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useSearchParamsHook from "@/hooks/useSearchParams";
import classNames from "classnames"; // Import classnames for conditional styling

const Sort: FC = () => {
	const { t } = useTranslation();
	const { setParam, removeParam, getParam } = useSearchParamsHook();
	const [selectedSort, setSelectedSort] = useState<string>("saralash");

	// Load the current sort value from the URL search parameters
	useEffect(() => {
		const sortBy = getParam("sortBy") as string;
		if (sortBy) {
			setSelectedSort(sortBy);
		}
	}, [getParam]);

	const handleSortChange = (sortText: string) => {
		if (sortText === "saralash") {
			removeParam("sortBy");
		} else {
			setParam("sortBy", sortText);
		}
		setSelectedSort(sortText);
	};

	return (
		<Select onValueChange={handleSortChange} value={selectedSort}>
			<SelectTrigger className="w-[150px] sm:w-[170px]">
				<SelectValue placeholder={t("books.sort_by")} />
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
