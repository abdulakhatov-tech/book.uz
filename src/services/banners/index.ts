import useAxiosInstance from "@/api";
import useQueryHandler from "@/hooks/useQueryHandler";

interface QueryParamsI {
	page: number;
	limit: number;
}

const useBannersService = () => {
	const axios = useAxiosInstance();

	const useGetAllBanners = (params?: QueryParamsI) =>
		useQueryHandler({
			queryKey: ["banners", params],
			queryFn: async () => {
				const response = await axios.get("/banners", { params });
				return response?.data?.data || [];
			},
		});

	return {
		useGetAllBanners,
	};
};

export default useBannersService;
