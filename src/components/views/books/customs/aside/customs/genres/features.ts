import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { GenreI } from "@/types";
import useGenresService from "@/services/genres";
import useOnlineStatus from "@/hooks/useOnlineStatus";

const useGenresFeatures = () => {
	const isOnline = useOnlineStatus();
	const { genres } = useGenresService();

	const [searchParams, setSearchParams] = useSearchParams();

	// Initialize selectedGenres from query params
	const initialSelectedGenres = searchParams.getAll("genreIds"); // Get all genreIds from query params

	const [search, setSearch] = useState("");
	const [selectedGenres, setSelectedGenres] = useState<string[]>(
		initialSelectedGenres,
	); // Init state with query params

	const { isLoading, isError, data } = genres;
	const loading = isLoading || isError || !isOnline;

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value.toLowerCase());
	};

	const handleSelectAllChange = (checked: boolean) => {
		if (checked) {
			setSelectedGenres(["all"]); // Set state to "all" instead of all IDs
		} else {
			setSelectedGenres([]); // Deselect all
		}
	};

	const handleGenreChange = (genreId: string) => {
		setSelectedGenres(
			(prevSelectedGenres) =>
				prevSelectedGenres.includes(genreId)
					? prevSelectedGenres.filter((id) => id !== genreId) // Deselect genre
					: [...prevSelectedGenres, genreId], // Select genre
		);
	};

	// Memoize filtered genres based on search query
	const filteredGenres = useMemo(() => {
		if (!data || search === "") return data; // If no search query, return all data
		return data.filter(
			(genre: GenreI) => genre.name.toLowerCase().includes(search), // Filter by genre name
		);
	}, [data, search]);

	// Sync query params with selectedGenres state
	useEffect(() => {
		const params = new URLSearchParams(searchParams);

		params.delete("genreIds"); // Clear existing genreIds

		// Append "all" if selected
		if (selectedGenres.includes("all")) {
			params.append("genreIds", "all"); // Add "all" if it is selected
		} else {
			// Append each selected genreId as its own query param
			selectedGenres.forEach((genreId) => {
				params.append("genreIds", genreId); // Append each genreId individually
			});
		}

		setSearchParams(params); // Update the URL with modified params
	}, [selectedGenres, searchParams]);

	// Sync selectedGenres state with query params on mount
	useEffect(() => {
		const genreIdsFromQuery = searchParams.getAll("genreIds"); // Get all genreIds from URL

		if (genreIdsFromQuery.length > 0) {
			setSelectedGenres(genreIdsFromQuery); // Set the state with genreIds from URL
		}
	}, [searchParams]); // Watch for changes in searchParams

	const isAllSelected =
		selectedGenres.includes("all") || data?.length === selectedGenres.length;

	return {
		handleSelectAllChange,
		handleSearchChange,
		handleGenreChange,
		selectedGenres,
		isAllSelected,
		setSearch,
		loading,
		search,
		data: filteredGenres,
	};
};

export default useGenresFeatures;
