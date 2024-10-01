import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BookI } from "@/types";
import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { GetAllBooksParams } from "./interface";

const useBooksService = () => {
	const { bookId } = useParams();
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();

	const handleError = (error: any, action: string) => {
		toast({
			title: `Error ${action}`,
			description: error.message,
		});
	};

	const useGetAllBooks = (params?: GetAllBooksParams) =>
		useQueryHandler({
			queryKey: ["books", params],
			queryFn: async () => {
				const response = await axios.get("/books", {
					params, // Pass the query parameters here
				});
				return response.data.data as BookI[];
			},
			onError: (error) => handleError(error, "fetching books"),
		});

	const getBookById = useQueryHandler({
		queryKey: ["book", { bookId }],
		queryFn: async () => {
			const response = await axios.get(`/books/${bookId}`);
			return response.data.data as BookI;
		},
		onError: (error) => handleError(error, "fetching book"),
	});

	const createBook = useMutation({
		mutationFn: async (book: any) => {
			// queryClient.setQueryData(["books"], (prev: any) => prev.concat(book));

			const response = await axios.post("/books", book);
			return response.data.data as BookI;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["books"],
			});
			toast({
				title: "Book created",
				description: "Book created successfully",
			});
		},
		onError: (error) => handleError(error, "creating book"),
	});

	const updateBookById = useMutation({
		mutationFn: async (book: any) => {
			queryClient.setQueryData(["books"], (prev: any) =>
				prev.map((item: any) => (item._id === book._id ? book : item)),
			);

			const response = await axios.put(`/books/${book._id}`, book);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["books"],
			});
			toast({
				title: "Book updated",
				description: "Book updated successfully",
			});
		},
		onError: (error) => handleError(error, "updating book"),
	});

	const deleteBookById = useMutation({
		mutationFn: async (bookId: string) => {
			queryClient.setQueryData(["books"], (prev: any) =>
				prev.filter((item: any) => item._id !== bookId),
			);

			await axios.delete(`/books/${bookId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["books"],
			});
			toast({
				title: "Book deleted",
				description: "Book deleted successfully",
			});
		},
		onError: (error) => handleError(error, "deleting book"),
	});

	return {
		useGetAllBooks,
		getBookById,
		createBook,
		updateBookById,
		deleteBookById,
	};
};

export default useBooksService;
