import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

const useGenresService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();
	const { genreId } = useParams();

	const genres = useQueryHandler({
		queryKey: ["genres"],
		queryFn: async () => {
			const response = await axios.get("/genres");
			return response.data?.data || [];
		},
	});

	const getGenreById = useQueryHandler({
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
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["genres"],
			});
			toast({
				title: "Genre updated",
				description: "Genre updated successfully",
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
			toast({
				title: "Genre deleted",
				description: "Genre deleted successfully",
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
		getGenreById,
		updateGenreById,
		deleteGenreById,
	};
};

export default useGenresService;
