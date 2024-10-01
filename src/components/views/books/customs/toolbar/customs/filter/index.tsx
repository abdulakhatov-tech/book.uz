import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FaFilter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import { toggleFilterVisibility } from "@/redux/slices/filter";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Authors, Genres, Languages, Price } from "../../../aside/customs";

const Filter: FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { filterVisibility } = useAppSelector((state) => state.filter);

	const handleToggle = () => {
		dispatch(toggleFilterVisibility());
	};

	return (
		<div className="lg:hidden">
			<Dialog open={filterVisibility}>
				<DialogTrigger>
					<Button
						onClick={handleToggle}
						className="flex gap-2 lg:hidden bg-secondary-blue hover:bg-secondary-blue text-blue cursor-pointer "
						aria-label="Open Filter"
					>
						{filterVisibility ? <IoMdClose /> : <FaFilter />}

						<span className="text-[14px] md:text-[16px] font-semibold">
							{t("books.filter")}
						</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="w-full h-screen thin-scrollbar">
					<div className="h-fit flex items-center justify-between mb-2 w-full">
						<DialogTitle className="flex items-center gap-[4px]">
							<FaFilter className="text-[20px] text-blue" />{" "}
							<span>{t("books.filter")}</span>
						</DialogTitle>
						<IoMdClose
							onClick={handleToggle}
							className="text-[26px] text-blue"
						/>
					</div>

					<div className="flex flex-col gap-6">
						<Genres />
						<Price />
						<Languages />
						<Authors />
					</div>
					<Button
						className="bg-orange hover:bg-orange text-white"
						onClick={handleToggle}
					>
						{t("books.filter")}
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Filter;
