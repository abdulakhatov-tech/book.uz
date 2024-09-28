import useOnlineStatus from "@/hooks/useOnlineStatus";
import useCategoriesService from "@/services/categories";

const useRecentlyPublishedBooksFeatures = () => {
	const { getRecentlyPublishedBooks } = useCategoriesService();
	const { isLoading, isError, data } = getRecentlyPublishedBooks;
	const isOnline = useOnlineStatus()

	const loading = isLoading || isError || !isOnline;

	return {
		books: data?.books,
		loading,
	};
};

export default useRecentlyPublishedBooksFeatures;
