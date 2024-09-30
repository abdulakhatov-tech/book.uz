import useOnlineStatus from "@/hooks/useOnlineStatus";
// import useCategoriesService from "@/services/categories";
import useSectionLazyLoader from "../../../../services/section-lazy-loader";

const useRecentlyPublishedBooksFeatures = () => {
	// const { getRecentlyPublishedBooks } = useCategoriesService();
	const { recentlyPublishedBooks, recentlyPublishedBooksRef } =
		useSectionLazyLoader();
	const { isLoading, isError, data } = recentlyPublishedBooks;
	const isOnline = useOnlineStatus();

	const loading = isLoading || isError || !isOnline;

	return {
		books: data?.books,
		loading,
		recentlyPublishedBooksRef,
	};
};

export default useRecentlyPublishedBooksFeatures;
