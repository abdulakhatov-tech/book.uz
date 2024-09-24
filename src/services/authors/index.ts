import useAxiosInstance from "@/api";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

const useAuthorsService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();
	const { authorId } = useParams();

	const getAllAuthors = useQueryHandler({
		queryKey: ["authors"],
		queryFn: async () => {
			const response = await axios.get("/authors");
			return response.data.data;
		},
	});

	const getAuthorById = useQueryHandler({
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
		getAllAuthors,
		createAuthor,
		updateAuthorById,
		getAuthorById,
		deleteAuthorById,
	};
};

export default useAuthorsService;
