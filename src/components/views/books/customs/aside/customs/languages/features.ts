import { useState, useEffect, useMemo } from "react";

import { MockData } from "@/utils";
import useLoading from "@/utils/custom-loading";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { useSearchParams } from "react-router-dom";

const useGenresFeatures = () => {
	const isOnline = useOnlineStatus();
	const { isLoading } = useLoading();
	const { bookLanguages: data } = MockData();

	const [searchParams, setSearchParams] = useSearchParams();

	// Initialize selectedGenres from query params
	const initialSelectedGenres = searchParams.getAll("language");

	const [search, setSearch] = useState("");
	const [selectedItems, setSelectedItems] = useState<string[]>(
		initialSelectedGenres,
	);

	const loading = isLoading || !isOnline;

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value.toLowerCase());
	};

	const handleSelectAllChange = (checked: boolean) => {
		if (checked) {
			setSelectedItems(['all']);
		} else {
			setSelectedItems([]);
		}
	};

	const handleItemChange = (itemId: string) => {
		setSelectedItems(
			(prevSelectedItems) =>
				prevSelectedItems.includes(itemId)
					? prevSelectedItems.filter((id) => id !== itemId) // Deselect
					: [...prevSelectedItems, itemId], // Select
		);

		// setSearch("");
	};

	// Memoize filtered items based on search query
	const filteredItems = useMemo(() => {
		if (!data || search === "") return data; // If no search query, return all data
		return data.filter(
			(item: any) => item?.label?.toLowerCase()?.includes(search), // Filter by item label
		);
	}, [data, search]);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);

		params.delete("language");

		if (selectedItems.includes("all")) {
			params.append("language", "all"); 
		} else {

			selectedItems.forEach((language) => {
				params.append("language", language); 
			});
		}

		setSearchParams(params); 
	}, [selectedItems, searchParams]);

	useEffect(() => {
		const languageFromQuery = searchParams.getAll("language"); 

		if (languageFromQuery.length > 0) {
			setSelectedItems(languageFromQuery); 
		}
	}, [searchParams]);

	const isAllSelected = selectedItems.includes("all") || (data?.length === selectedItems.length);

	return {
		handleSelectAllChange,
		handleSearchChange,
		handleItemChange,
		selectedItems,
		isAllSelected,
		setSearch,
		loading,
		search,
		data: filteredItems,
	};
};

export default useGenresFeatures;
