import type { FC } from "react";
import classNames from "classnames";
import { setColumnLimit } from "@/redux/slices/column-counter";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const ColumnCounter: FC = () => {
	const { limit } = useAppSelector((state) => state.columnCounter);
	const dispatch = useAppDispatch();

	const handleViewCount = (count: number) => {
		dispatch(setColumnLimit(count));
	};

	const renderGridItems = (count: number, size: number, style: string) => {
		const isSelected = limit === count;
		return Array.from({ length: size }).map((_, idx: number) => (
			<span
				key={idx}
				className={classNames(style, {
					"bg-blue": isSelected,
					"bg-gray": !isSelected,
				})}
			></span>
		));
	};

	return (
		<ul className="hidden md:flex items-center gap-2">
			<li
				onClick={() => handleViewCount(3)}
				className={classNames("grid grid-cols-3 gap-[2px] cursor-pointer")}
			>
				{renderGridItems(3, 9, "w-2 h-2")}
			</li>

			<li
				onClick={() => handleViewCount(4)}
				className={classNames("grid grid-cols-4 gap-[2px] cursor-pointer")}
			>
				{renderGridItems(4, 16, "w-[5.5px] h-[5.5px]")}
			</li>

			<li
				onClick={() => handleViewCount(5)}
				className={classNames("grid grid-cols-5 gap-[2px] cursor-pointer")}
			>
				{renderGridItems(5, 25, "w-[4px] h-[4px]")}
			</li>
		</ul>
	);
};

export default ColumnCounter;
