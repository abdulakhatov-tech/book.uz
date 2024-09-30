import type { FC } from "react";

import { GenreI } from "@/types";
// import useGenresService from "@/services/genres";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { GenreItem, LoadingSkeleton } from "./customs";
import useSectionLazyLoader from "../../../../../../services/section-lazy-loader";

const Genres: FC = () => {
	// const { genres } = useGenresService();
	const isOnline = useOnlineStatus();
	const { genres, genresRef } = useSectionLazyLoader()

	const { isLoading, isError, data: genresData } = genres;
	const loading = !isOnline || isLoading || isError;

	if (!genresData?.length) return null;

	return (
		<div ref={genresRef} data-section="genres" className="hidden lg:block min-w-[287px] max-w-[287px] w-[287px] bg-[#F6F6F6] rounded-[8px] p-2 ">
			<ul className="flex flex-col gap-2 text-[#1E1E1E] h-full thin-scrollbar">
				{loading ? (
					<LoadingSkeleton />
				) : (
					genresData.map((item: GenreI, idx: number) => (
						<GenreItem key={item?._id ?? idx} {...item} />
					))
				)}
			</ul>
		</div>
	);
};

export default Genres;
