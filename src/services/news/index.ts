import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

const useNewsService = () => {
	const axios = useAxiosInstance();

	const allNews = useQueryHandler({
		queryKey: ["news"],
		queryFn: async () => {
			const response = await axios.get("/news");
			return response.data?.data || [];
		},
		onError: (err: any) => {
			toast({
				title: "Error fetching news",
				description: err.message,
			});
		},
	});

	return {
		allNews,
	};
};

export default useNewsService;
