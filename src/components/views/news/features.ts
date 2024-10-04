import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useNewsService from "@/services/news";
import useOnlineStatus from "@/hooks/useOnlineStatus";

interface QueryParamsI {
	page: number;
	limit: number;
	type?: string;
	[key: string]: any;
}

const useNewsFeatures = () => {
	const isOnline = useOnlineStatus();
	const { useGetAllNews } = useNewsService();
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [queryParams, setQueryParams] = useState<QueryParamsI>({
		page: 1,
		limit: 12,
		type: "all",
	});

	const { isLoading, isError, data: newsData } = useGetAllNews(queryParams);

	const loading = isLoading || !isOnline || isError;

	useEffect(() => {
		const params: QueryParamsI = { page: 1, limit: 12, type: "all" };
		searchParams.forEach((value: string, key: string) => {
			if (key === "type") {
				// Set 'type' as a string (no need to cast to a number)
				params[key] = value;
			} else if (["page", "limit"].includes(key)) {
				// Cast 'page' and 'limit' to numbers
				params[key] = Number(value);
			}

			// If invalid type is present, reset it to 'all'
			if (
				key === "type" &&
				value !== "all" &&
				value !== "news" &&
				value !== "newBook" &&
				value !== "discounts"
			) {
				setSearchParams((prevParams) => {
					const updatedParams = new URLSearchParams(prevParams.toString());
					updatedParams.set("type", "all");
					return updatedParams;
				});
			}
		});

		const pageParams = searchParams.get("page");
		const newPage = pageParams ? Number(pageParams) : 1;
		setCurrentPage(newPage);
		setQueryParams(params);
	}, [searchParams]);

	const handleChange = (type: string) => {
		setSearchParams((prevParams) => {
			const updatedParams = new URLSearchParams(prevParams.toString());

			if (type === "sort_by") {
				// If 'sort_by', remove the 'type' parameter from the URL
				updatedParams.delete("type");
			} else {
				// Otherwise, set the 'type' parameter with the new value
				updatedParams.set("type", type);
			}

			return updatedParams;
		});
	};

	return {
		loading,
		newsData,
		currentPage,
		queryParams,
		handleChange,
	};
};

export default useNewsFeatures;
