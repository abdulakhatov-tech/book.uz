import React from "react";
import { useTranslation } from "react-i18next";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { GenreI } from "@/types";
import { SelectGenrePropsI } from "./interface";
import useGenresService from "@/services/genres";

const SelectGenre: React.FC<SelectGenrePropsI> = ({ value, onChange }) => {
	const { t } = useTranslation();
	const { genres } = useGenresService();

	const { isLoading, isError, data: genresData } = genres;

	return (
		<Select
			name="genre"
			value={value}
			onValueChange={(value) => onChange(value, "genre")}
		>
			<SelectTrigger>
				<SelectValue placeholder={t("dashboard.books.select_genre")} />
			</SelectTrigger>
			<SelectContent className="max-h-[400px]">
				{isLoading || isError
					? Array.from({ length: 10 }).map((_: any, idx: number) => (
							<Skeleton key={idx} className="w-full h-[30px] mb-1" />
						))
					: genresData?.map((genre: GenreI) => (
							<SelectItem value={genre._id!} key={genre._id}>
								{genre.name}
							</SelectItem>
						))}
			</SelectContent>
		</Select>
	);
};

export default SelectGenre;
