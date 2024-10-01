import { useState, useEffect, useMemo } from "react";

import { AuthorI } from "@/types";
import useAuthorsService from "@/services/authors";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { useSearchParams } from "react-router-dom";

const useAuthorsFeatures = () => {
  const isOnline = useOnlineStatus();
  const { getAllAuthors } = useAuthorsService();

  const [searchParams, setSearchParams] = useSearchParams();

  const initialSelectedGenres = searchParams.getAll("authorIds");

  const [search, setSearch] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(initialSelectedGenres);

  const { isLoading, isError, data } = getAllAuthors;
  const loading = isLoading || isError || !isOnline;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      const allAuthorIds = data?.map((author: AuthorI) => author._id) || [];
      setSelectedAuthors(allAuthorIds);
    } else {
      setSelectedAuthors([]);
    }
  };

  const handleAuthorChange = (authorId: string) => {
    setSelectedAuthors(
      (prevSelectedAuthors) =>
        prevSelectedAuthors.includes(authorId)
          ? prevSelectedAuthors.filter((id) => id !== authorId) // Deselect genre
          : [...prevSelectedAuthors, authorId] // Select genre
    );

    // setSearch("");
  };

  // Memoize filtered genres based on search query
  const filteredAuthors = useMemo(() => {
    if (!data || search === "") return data; // If no search query, return all data
    return data.filter(
      (author: AuthorI) => author?.fullName?.toLowerCase()?.includes(search) // Filter by genre name
    );
  }, [data, search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete("authorIds");

    selectedAuthors.forEach((authorId) => {
      params.append("authorIds", authorId); 
    });

    setSearchParams(params); // Update the URL with modified params
  }, [selectedAuthors, searchParams]);

  useEffect(() => {
    const authorIdsFromQuery = searchParams.getAll("authorIds"); // Get all authorIds from URL

    if (authorIdsFromQuery.length > 0) {
      setSelectedAuthors(authorIdsFromQuery); // Set the state with genreIds from URL
    }
  }, [searchParams]); 

  const isAllSelected = data?.length === selectedAuthors.length;

  return {
    handleSelectAllChange,
    handleSearchChange,
    handleAuthorChange,
    selectedAuthors,
    isAllSelected,
    setSearch,
    loading,
    search,
    data: filteredAuthors,
  };
};

export default useAuthorsFeatures;
