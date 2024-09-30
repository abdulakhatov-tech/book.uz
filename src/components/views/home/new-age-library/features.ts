import { useEffect, useState } from "react";

import { BookI } from "@/types";
// import useCategoriesService from "@/services/categories";
import useSectionLazyLoader from "../../../../services/section-lazy-loader";

const useNewAgeLibraryFeatures = () => {
	// const { getNewAgeLibrary } = useCategoriesService();
	const { newAgeLibraryBooks, newAgeLibraryBooksRef} = useSectionLazyLoader();
	const [books, setBooks] = useState<BookI[]>([]);
	const [booksCount, setBooksCount] = useState<number>(11); // Default to at least 11

	const { isLoading, isError, data } = newAgeLibraryBooks;
	const loading = isLoading || isError;

	useEffect(() => {
		if (data) {
			const filteredBooks = data?.books?.slice(0, booksCount);
			setBooks(filteredBooks);
		}
	}, [data, booksCount]);

	const handleMoreBooks = () => {
		setBooksCount((prev) => prev + 6);
	};

	const handleLessBooks = () => {
		setBooksCount((prev) => (prev > 11 ? prev - 6 : prev));
	};

	return {
		newAgeLibraryBooksRef,
		books,
		loading,
		booksCount,
		handleMoreBooks,
		handleLessBooks,
	};
};

export default useNewAgeLibraryFeatures;
