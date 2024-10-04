import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useOnlineStatus from "@/hooks/useOnlineStatus";
import useAuthorsService from "@/services/authors";

interface QueryParamsI {
	page: number;
	limit: number;
	search?: string;
	[key: string]: any;
}

const useAuthorsFeatures = () => {
	const isOnline = useOnlineStatus();
	const { useGetAllAuthors } = useAuthorsService();
	const [searchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [queryParams, setQueryParams] = useState<QueryParamsI>({
		page: 1,
		limit: 12,
	});

	const { isLoading, isError, data: authors } = useGetAllAuthors(queryParams);
	const loading = isLoading || !isOnline || isError;

	useEffect(() => {
		const params: QueryParamsI = { page: 1, limit: 24 };
		searchParams.forEach((value: string, key: string) => {
			if (["page", "limit"].includes(key)) {
				params[key] = Number(value);
			} else if (key === "search") {
				params[key] = value.trim();
			}
		});

		const pageParams = searchParams.get("page");
		const newPage = pageParams ? Number(pageParams) : 1;
		setCurrentPage(newPage);
		setQueryParams(params);
	}, [searchParams]);

	return {
		loading,
		authors,
		currentPage,
		queryParams,
	};
};

export default useAuthorsFeatures;
