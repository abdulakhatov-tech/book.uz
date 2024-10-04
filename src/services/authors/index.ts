import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface QueryParamsI {
	page: number;
	limit: number;
}

const useAuthorsService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();
	const useGetAllAuthors = (params?: QueryParamsI) =>
		useQueryHandler({
			queryKey: ["authors", params],
			queryFn: async () => {
				const response = await axios.get("/authors", { params });
				return response.data.data;
			},
		});
	const useGetAuthorById = (authorId: string) =>
		useQueryHandler({
			queryKey: ["author", { authorId }],
			queryFn: async () => {
				const response = await axios.get(`/authors/${authorId}`);
				return response.data.data;
			},
			onError: (error) => {
				toast({
					title: "Error fetching author",
					description: error.message,
				});
			},
		});
	const createAuthor = useMutation({
		mutationFn: async (author: any) => {
			const response = await axios.post("/authors", author);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["authors"],
			});
			toast({
				title: "Author created",
				description: "Author created successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error creating author",
				description: error.message,
			});
		},
	});
	const updateAuthorById = useMutation({
		mutationFn: async (author: any) => {
			const response = await axios.put(`/authors/${author._id}`, author);
			return response.data.data;
		},
		onSuccess: (updatedAuthor) => {
			queryClient.invalidateQueries({
				queryKey: ["author", { authorId: updatedAuthor._id }],
			});
			queryClient.invalidateQueries({
				queryKey: ["authors"],
			});
			toast({
				title: "Author updated",
				description: "Author updated successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error updating author",
				description: error.message,
			});
		},
	});
	const deleteAuthorById = useMutation({
		mutationFn: async (authorId: string) => {
			await axios.delete(`/authors/${authorId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["authors"],
			});
			toast({
				title: "Author deleted",
				description: "Author deleted successfully",
			});
		},
		onError: (error) => {
			toast({
				title: "Error deleting author",
				description: error.message,
			});
		},
	});
	return {
		createAuthor,
		useGetAllAuthors,
		updateAuthorById,
		useGetAuthorById,
		deleteAuthorById,
	};
};
export default useAuthorsService;
