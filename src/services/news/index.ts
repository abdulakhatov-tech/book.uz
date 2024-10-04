import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

interface QueryParamsI {
	page: number;
	limit: number;
	type?: string;
}

const useNewsService = () => {
	const axios = useAxiosInstance();

	const useGetAllNews = (params?: QueryParamsI) =>
		useQueryHandler({
			queryKey: ["news", params],
			queryFn: async () => {
				const response = await axios.get("/news", {
					params,
				});
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
		useGetAllNews,
	};
};

export default useNewsService;
