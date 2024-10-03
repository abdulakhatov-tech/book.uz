import { useParams } from "react-router-dom";

import useBooksService from "@/services/books";
import useOnlineStatus from "@/hooks/useOnlineStatus";

const useBookDetailsFeatures = () => {
	const { slug } = useParams();
	const isOnline = useOnlineStatus();
	const { useGetBookById } = useBooksService();

	const { data: book, isLoading, isError } = useGetBookById(slug!);
	const loading = !isOnline || isLoading || isError;


	return {
		book,
		loading,
	};
};

export default useBookDetailsFeatures;
