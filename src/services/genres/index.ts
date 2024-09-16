import useAxiosInstance from "@/api";
import useQueryHandler from "@/hooks/useQueryHandler";

const useGenresService = () => {
	const axios = useAxiosInstance();

	const genres = useQueryHandler({
		queryKey: ["genres"],
		queryFn: async () => {
			const response = await axios.get("/genres");
			return response.data?.data || [];
		},
	});

	return { genres };
};

export default useGenresService;
