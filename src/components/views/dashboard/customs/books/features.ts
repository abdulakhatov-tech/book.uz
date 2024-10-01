import { useEffect, useState, useMemo } from "react";

import { BookI } from "@/types";
import useBooksService from "@/services/books";

const useBookFeatures = () => {
	const { useGetAllBooks } = useBooksService();
	const [books, setBooks] = useState<BookI[]>([]);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof BookI;
		direction: "asc" | "desc";
	} | null>(null);

	const { isLoading, isError, data } = useGetAllBooks();

	// Update books list when data changes
	useEffect(() => {
		if (data) setBooks(data);
	}, [data]);

	// Reusable sort handler
	const handleSort = (key: keyof BookI) => {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig?.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	// Memoized sorted books
	const sortedBooks = useMemo(() => {
		if (!sortConfig) return books;

		const sorted = [...books].sort((a, b) => {
			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];

			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortConfig.direction === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			if (typeof aValue === "number" && typeof bValue === "number") {
				return sortConfig.direction === "asc"
					? aValue - bValue
					: bValue - aValue;
			}

			return 0;
		});

		return sorted;
	}, [books, sortConfig]);

	return {
		isLoading,
		isError,
		sortedBooks,
		handleSort,
		sortConfig,
		setSortConfig,
	};
};

export default useBookFeatures;
