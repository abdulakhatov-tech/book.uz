import type { FC } from "react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { GenreI } from "@/types";
import CategoryDropdownFeatures from "./features";
import { CategoryItem, LoadingSkeleton } from "./customs";

const CategoryDropdown: FC<{ children: React.ReactNode }> = ({ children }) => {
	const { loading, genresData, handleClose, categoryDropdownVisibility } =
		CategoryDropdownFeatures();

	return (
		<Popover open={categoryDropdownVisibility}>
			<PopoverTrigger className="lg:hidden" tabIndex={0}>
				{children}
			</PopoverTrigger>
			<PopoverContent className="w-screen h-screen thin-scrollbar">
				<div className="block w-full h-[75vh] bg-[#F6F6F6] rounded-[8px] thin-scrollbar">
					<ul className="flex flex-col gap-1 text-[#1E1E1E] p-2 thin-scrollbar">
						{loading ? (
							<LoadingSkeleton />
						) : (
							genresData?.map(({ _id, name }: GenreI) => (
								<CategoryItem
									key={_id}
									id={_id!}
									name={name}
									onClose={handleClose}
								/>
							))
						)}
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default CategoryDropdown;
