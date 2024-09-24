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

import { AuthorI } from "@/types";
import Section from "@/layout/section";
import useAuthorsFeatures from "./features";
import { LoadingRows, UserRow } from "./customs";

const Authors: React.FC = () => {
	const { t } = useTranslation();
	const { getAllAuthors } = useAuthorsFeatures();

	const { isLoading, isError, data } = getAllAuthors;

	return (
		<Section id="dashboard-authors">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-[22px] text-black mb-4">
					{t("dashboard.authors.authors")}
				</h2>

				<Link to="create">
					<Button>{t("dashboard.authors.create")}</Button>
				</Link>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">№</TableHead>
						<TableHead>{t("dashboard.authors.full_name")}</TableHead>
						<TableHead>{t("dashboard.authors.audio_books_count")}</TableHead>
						<TableHead>{t("dashboard.authors.books_count")}</TableHead>
						<TableHead>{t("dashboard.authors.ebooks_count")}</TableHead>
						<TableHead>{t("dashboard.authors.date_of_birth")}</TableHead>
						<TableHead>{t("dashboard.authors.date_of_death")}</TableHead>
						<TableHead>{t("dashboard.authors.created_at")}</TableHead>
						<TableHead className="text-right">
							{t("dashboard.users.actions")}
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{isLoading || isError ? (
						<LoadingRows />
					) : (
						data?.authors?.map((author: AuthorI, idx: number) => (
							<UserRow
								key={author._id}
								author={author}
								index={idx}
								// onDemote={() => demoteUserToUserHandler(user._id)}
								// canDemote={canDemote}
							/>
						))
					)}
				</TableBody>
			</Table>
		</Section>
	);
};

export default Authors;
