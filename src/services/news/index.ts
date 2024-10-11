import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface QueryParamsI {
	page: number;
	limit: number;
	type?: string;
}

const useNewsService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();

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

	const deleteNewsById = useMutation({
		mutationFn: async (newsId: string) => {
			const response = await axios.delete(`/news/${newsId}`);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["news"],
			});
			toast({
				title: "News deleted",
			});
		},
		onError: (error) => {
			toast({
				title: "Error deleting news",
				description: error.message,
			});
		},
	});

	const useGetNewsById = (newsId: string) =>
		useQueryHandler({
			queryKey: ["news", { newsId }],
			queryFn: async () => {
				const response = await axios.get(`/news/${newsId}`);
				return response.data.data;
			},
			onError: (error) => {
				toast({
					title: "Error fetching news",
					description: error.message,
				});
			},
		});

	return {
		useGetAllNews,
		deleteNewsById,
		useGetNewsById,
	};
};

export default useNewsService;
