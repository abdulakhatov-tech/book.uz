import { useEffect, useState, type FC } from "react";
import { useSearchParams } from "react-router-dom";

import { BookI } from "@/types";
import { ProductCard } from "@/generic";
import useBooksService from "@/services/books";
import { useAppSelector } from "@/hooks/useRedux";
import BookSkeleton from "@/components/common/product-card-skeleton";

import CustomPagination from "@/tools/pagination";

interface QueryParams {
	page: number;
	limit?: number;
	fromPrice?: number;
	toPrice?: number;
	asc?: number;
	[key: string]: any; // Allow other keys as well
}

const Main: FC = () => {
	const { useGetAllBooks } = useBooksService();
	const [searchParams] = useSearchParams();
	const { limit } = useAppSelector((state) => state.columnCounter);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [queryParams, setQueryParams] = useState<QueryParams>({ page: 1 });

	// Fetching books using the state queryParams
	const { isLoading, isError, data } = useGetAllBooks(queryParams);

	const loading = isLoading || isError;

	useEffect(() => {
		// Convert searchParams to a plain object
		const params: QueryParams = { page: 1 }; // Ensure page is always set
		searchParams.forEach((value, key) => {
			if (["page", "limit", "fromPrice", "toPrice", "asc"].includes(key)) {
				params[key] = Number(value);
			} else {
				params[key] = value;
			}
		});

		// Set the state and query params
		const pageParam = searchParams.get("page");
		const newPage = pageParam ? Number(pageParam) : 1;
		setCurrentPage(newPage);
		setQueryParams(params);
	}, [searchParams]);

	return (
		<div>
			<div
				className={`grid grid-cols-${limit} gap-${
					limit === 3 ? 6 : limit === 4 ? 5 : 3
				}`}
			>
				{loading
					? Array.from({ length: limit ?? 10 }).map((_, idx: number) => (
							<BookSkeleton key={idx} />
						))
					: data?.map((book: BookI) => (
							<ProductCard key={book._id} book={book} />
						))}
			</div>

			{data?.length > 12 && <CustomPagination currentPage={currentPage} />}
		</div>
	);
};

export default Main;
