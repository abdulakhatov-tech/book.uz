import useCategoriesService from "@/services/categories";

const useRecentlyPublishedBooksFeatures = () => {
	const { getRecentlyPublishedBooks } = useCategoriesService();
	const { isLoading, isError, data } = getRecentlyPublishedBooks;

	const loading = isLoading || isError;

	return {
		books: data?.books,
		loading,
	};
};

export default useRecentlyPublishedBooksFeatures;
