import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { GenreI } from "@/types";
import Section from "@/layout/section";
import useGenresService from "@/services/genres";
import { GenreRow, LoadingRows } from "./customs";

const Genres: React.FC = () => {
	const { t } = useTranslation();
	const { genres } = useGenresService();

	const { isLoading, isError, data } = genres;

	return (
		<Section id="dashboard-genres">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-[22px] text-black mb-4 font-bold">
					{t("dashboard.genres.title")}
				</h2>
				<Link to="create">
					<Button>{t("dashboard.genres.create")}</Button>
				</Link>
			</div>
			<Table>
				<TableCaption>
					{!isLoading && !isError && !data?.length ? "No books" : ""}
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px] font-bold text-[18px] text-secondary-black">№</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">{t("dashboard.genres.name")}</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">{t("dashboard.genres.books_count")}</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">{t("dashboard.genres.created_at")}</TableHead>
						<TableHead className="text-right font-bold text-[18px] text-secondary-black">
							{t("dashboard.users.actions")}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading || isError ? (
						<LoadingRows />
					) : (
						data?.map((genre: GenreI, idx: number) => (
							<GenreRow key={genre._id} genre={genre} index={idx} />
						))
					)}
				</TableBody>
			</Table>
		</Section>
	);
};

export default Genres;
