import { useEffect, type FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import useSearchParamsHook from "@/hooks/useSearchParams";

const ViewCounter: FC<{ viewOptions?: number[] }> = ({
	viewOptions = [9, 24, 36],
}) => {
	const { t } = useTranslation();
	const { setParam, getParam } = useSearchParamsHook();

	const activeCount = +(getParam("limit") as string) || 24;

	const handleViewCount = (count: number) => {
		if (count !== activeCount) {
			setParam("limit", count.toString());
		}
	};

	useEffect(() => {
		if (getParam("limit") && !viewOptions.includes(Number(getParam("limit")))) {
			setParam("limit", viewOptions[0].toString());
			handleViewCount(viewOptions[0]);
			return () => {
				setParam("limit", viewOptions[0].toString());
			};
		}
	}, [getParam("limit")]);

	return (
		<div className="hidden md:flex items-center gap-2">
			<h4 className="text-[14px] font-medium leading-[16.94px] text-[#565656]">
				{t("books.show")}:
			</h4>
			<ul className="flex items-center gap-2">
				{viewOptions.map((count) => (
					<li
						key={count}
						onClick={() => handleViewCount(count)}
						className={classNames(
							"center w-[29px] h-[29px] rounded-[4px] text-[14px] font-semibold leading-[16.94px] cursor-pointer",
							{
								"bg-secondary-blue text-blue": activeCount === count,
								"bg-[#F6F6F6] text-[#565656]": activeCount !== count,
							},
						)}
					>
						{count}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ViewCounter;
