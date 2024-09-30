import { useEffect, useMemo, useState, type FC } from "react";

import useAuthorsService from "@/services/authors";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useSearchParamsHook from "@/hooks/useSearchParams";
import { AuthorI } from "@/types";

const useAuthorsFeatures = () => {
	const isOnline = useOnlineStatus();
	const { getAllAuthors } = useAuthorsService();
	const { setParam, getParam, removeParam } = useSearchParamsHook();

	const [search, setSearch] = useState("");
	const [authors, setAuthors] = useState<AuthorI[]>([]);
	const selectedAuthor = getParam("authorId");

	const { isLoading, isError, data } = getAllAuthors;

	const loading = !isOnline || isError || isLoading;

	const searchResults = useMemo(() => {
		if (data) {
			if (search.length) {
				return data.filter((author: AuthorI) =>
					author.fullName.toLowerCase().includes(search.toLowerCase()),
				);
			}
			return data;
		}
		return [];
	}, [data, search]);

	useEffect(() => {
		if (data) {
			setAuthors(searchResults);
		}
	}, [searchResults, selectedAuthor, setParam, data]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleAuthor = (authorId: string) => {
		if (selectedAuthor === authorId) {
			removeParam("authorId");
			return;
		}

		setParam("authorId", authorId);
	};
	return {
		handleSearchChange,
		handleAuthor,
		loading,
		authors,
		search,
		selectedAuthor,
	};
};

export default useAuthorsFeatures;
