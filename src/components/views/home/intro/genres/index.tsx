import React from "react";
import { NavLink } from "react-router-dom";

import { GenreI } from "@/types";
import useGenresService from "@/services/genres";
import { Skeleton } from "@/components/ui/skeleton";
import useOnlineStatus from "@/hooks/useOnlineStatus";

const Genres: React.FC = () => {
	const { genres } = useGenresService();
	const isOnline = useOnlineStatus();

	const { isLoading, isError, data: genresData } = genres;

	if (!isOnline || isLoading || isError) {
		return (
			<div className="hidden lg:block min-w-[287px] max-w-[287px] w-[287px] bg-[#F6F6F6] rounded-[8px] overflow-y-auto py-1">
				<ul className="flex flex-col gap-2">
					{Array.from({ length: 10 }).map((_, index) => (
						<Skeleton key={index} className="p-6 w-full bg-[#e5e0e0]" />
					))}
				</ul>
			</div>
		);
	}

	if (!genresData?.length) return null;

	return (
		<div className="hidden lg:block min-w-[287px] max-w-[287px] w-[287px] bg-[#F6F6F6] rounded-[8px] overflow-y-auto py-1">
			<ul className="flex flex-col text-[#1E1E1E]">
				{genresData.map(({ _id, name }: GenreI) => (
					<li
						key={_id}
						className="py-2 px-4 hover:bg-[#EF7F1A] hover:text-white active:opacity-75"
					>
						<NavLink
							to={`/books?page=1&limit=24&genreIds=${_id}`}
							className="text-[16px] font-normal"
						>
							{name}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Genres;
