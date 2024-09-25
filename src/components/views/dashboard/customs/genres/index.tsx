import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Section from "@/layout/section";
import useGenresService from "@/services/genres";
import { GenreRow, LoadingRows } from "./customs";
import { GenreI } from "@/types";

const Genres: React.FC = () => {
	const { t } = useTranslation();
	const { genres } = useGenresService();

	const { isLoading, isError, data } = genres;

	return (
		<Section id="dashboard-genres">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-[22px] text-black mb-4">
					{t("dashboard.genres.title")}
				</h2>
				<Link to="create">
					<Button>{t("dashboard.genres.create")}</Button>
				</Link>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">№</TableHead>
						<TableHead>{t("dashboard.genres.name")}</TableHead>
						<TableHead>{t("dashboard.genres.audio_books_count")}</TableHead>
						<TableHead>{t("dashboard.genres.books_count")}</TableHead>
						<TableHead>{t("dashboard.genres.ebooks_count")}</TableHead>
						<TableHead>{t("dashboard.genres.created_at")}</TableHead>
						<TableHead className="text-right">
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
