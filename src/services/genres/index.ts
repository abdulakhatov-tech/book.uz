import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

const useGenresService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();

	const genres = useQueryHandler({
		queryKey: ["genres"],
		queryFn: async () => {
			const response = await axios.get("/genres");
			return response.data?.data || [];
		},
		onError: (err: any) => {
			toast({
				title: "Error fetching news",
				description: err.message,
			});
		},
	});

	const useGetGenreById = (genreId: string) => useQueryHandler({
		queryKey: ["genre", { genreId }],
		queryFn: async () => {
			const response = await axios.get(`/genres/${genreId}`);
			return response.data.data;
		},
		onError: (error) => {
			toast({
				title: "Error fetching genre",
				description: error.message,
			});
		},
	});

	const createGenre = useMutation({
		mutationFn: async (genre: any) => {
			const response = await axios.post("/genres", genre);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["genres"],
			});
			toast({
				title: "Genre created",
				description: "Genre created successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error creating genre",
				description: error.message,
			});
		},
	});

	const updateGenreById = useMutation({
		mutationFn: async (genre: any) => {
			const response = await axios.put(`/genres/${genre._id}`, genre);
			return response.data.data;
		},
		onSuccess: (updatedGenre:any) => {
			queryClient.invalidateQueries({
				queryKey: ["genres"],
			});
			queryClient.invalidateQueries({
                queryKey: ["genre", { genreId: updatedGenre?._id }],
            });
		},
		onError: (error) => {
			toast({
				title: "Error updating genre",
				description: error.message,
			});
		},
	});

	const deleteGenreById = useMutation({
		mutationFn: async (genreId: any) => {
			const response = await axios.delete(`/genres/${genreId}`);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["genres"],
			});
		},
		onError: (error) => {
			toast({
				title: "Error deleting genre",
				description: error.message,
			});
		},
	});

	return {
		genres,
		createGenre,
		useGetGenreById,
		updateGenreById,
		deleteGenreById,
	};
};

export default useGenresService;
