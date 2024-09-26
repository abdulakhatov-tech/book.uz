import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSort } from "react-icons/fa";

import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { BookI } from "@/types";
import Section from "@/layout/section";
import useBookFeatures from "./features";
import { BookRow, LoadingRows } from "./customs";

const DashboardBooks: React.FC = () => {
	const { t } = useTranslation();
	const { isLoading, isError, sortedBooks, handleSort } = useBookFeatures();

	// Handling Loading and Error States
	const renderContent = () => {
		if (isLoading || isError) return <LoadingRows />;
		return sortedBooks?.map((book: BookI, idx: number) => (
			<BookRow key={book._id} book={book} index={idx} />
		) );
	};

	return (
		<Section id="dashboard-books">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-[22px] text-black mb-4">
					{t("dashboard.books.title")}
				</h2>
				<Link to="create">
					<Button>{t("dashboard.books.create")}</Button>
				</Link>
			</div>
			<Table>
				<TableCaption>{!isLoading && !isError && !sortedBooks?.length ? 'No books' : ""}</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">№</TableHead>
						<TableHead onClick={() => handleSort("name")}>
							{t("dashboard.books.name")} <FaSort className="inline-block" />
						</TableHead>
						<TableHead onClick={() => handleSort("genre")}>
							{t("dashboard.books.genre")} <FaSort className="inline-block" />
						</TableHead>
						<TableHead onClick={() => handleSort("author")}>
							{t("dashboard.books.author")} <FaSort className="inline-block" />
						</TableHead>
						<TableHead onClick={() => handleSort("amount")}>
							{t("dashboard.books.amount")} <FaSort className="inline-block" />
						</TableHead>
						<TableHead onClick={() => handleSort("bookPrice")}>
							{t("dashboard.books.book_price")}{" "}
							<FaSort className="inline-block" />
						</TableHead>
						<TableHead>
							{t("dashboard.books.cover")} <FaSort className="inline-block" />
						</TableHead>
						<TableHead onClick={() => handleSort("createdAt")}>
							{t("dashboard.books.created_at")}{" "}
							<FaSort className="inline-block" />
						</TableHead>
						<TableHead className="text-right">
							{t("dashboard.users.actions")}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>{renderContent()}</TableBody>
			</Table>
		</Section>
	);
};

export default DashboardBooks;
