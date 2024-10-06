import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo, useState, type FC } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { GenreI } from "@/types";
import { LoadingSkeleton } from "./customs";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import useSectionLazyLoader from "@/services/section-lazy-loader";

const Genres: FC = () => {
	const { t } = useTranslation();
	const isOnline = useOnlineStatus();
	const [search, setSearch] = useState<string>("");
	const { genres, genresRef } = useSectionLazyLoader();
	const { isLoading, isError, data: genresData = [] } = genres;

	const loading = !isOnline || isLoading || isError;

	// Filter genres based on search input
	const filteredGenres = useMemo(() => {
		if (!search.trim()) return genresData;
		return genresData.filter((genre: GenreI) =>
			genre?.name?.toLowerCase().includes(search?.toLowerCase()),
		);
	}, [search, genresData]);

	// Memoize genre items to avoid recalculating on every render
	const genreItems = useMemo(
		() =>
			filteredGenres.map((item: GenreI) => (
				<NavLink
					key={item._id}
					to={`/books?page=1&limit=24&genreIds=${item._id}`}
					aria-label={`Genre ${item.name}`}
					className={({ isActive }) =>
						classNames(
							"py-2 px-4 hover:bg-orange hover:text-white active:opacity-75 rounded-md text-[16px] font-normal cursor-pointer flex items-center justify-between gap-2  transition-transform duration-300 ease-in-out transform hover:scale-[0.96] hover:shadow-lg",
							{ "bg-orange text-white": isActive }, // Highlight the active genre
						)
					}
				>
					<li className="w-full flex items-center justify-between">
						<span className="w-[200px] font-semibold">{item.name}</span>
					</li>
				</NavLink>
			)),
		[filteredGenres],
	);

	return (
		<div
			ref={genresRef}
			data-section="genres"
			className="hidden lg:block min-w-[287px] max-w-[287px] w-[287px] bg-[#F6F6F6] rounded-[8px] p-2"
		>
			{/* Search Bar */}
			<Label className="relative block mb-1">
				<Input
					placeholder={t("books.search")}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					// className='custom-shadow'
					disabled={loading}
				/>
				{search.length ? (
					<IoMdClose
						onClick={() => setSearch("")}
						className="absolute top-[50%] right-3 -translate-y-[50%] text-[22px] text-gray cursor-pointer"
						aria-label="Clear search"
					/>
				) : (
					<IoIosSearch className="absolute top-[50%] right-3 -translate-y-[50%] text-[22px] text-gray" />
				)}
			</Label>

			{/* Genre List */}
			<div className="h-[390px] overflow-y-auto thin-scrollbar">
				<ul className="flex flex-col gap-1 text-[#1E1E1E] h-full">
					{loading ? (
						<LoadingSkeleton />
					) : genreItems.length ? (
						genreItems
					) : (
						<li className="text-center text-gray-500">No Genres</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Genres;
