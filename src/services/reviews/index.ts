import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ReviewI } from "@/types";
import useAxiosInstance from "@/api";
import { toast } from "@/components/ui/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

const useReviewsService = () => {
	const axios = useAxiosInstance();
	const queryClient = useQueryClient();

	const createReview = useMutation({
		mutationFn: async (body: any) => {
			const response = await axios.post<{ data: ReviewI }>(
				`/reviews/${body.bookId}`,
				body,
			);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["reviews"],
			});
			toast({
				title: "Review created",
				description: "Your review has been successfully posted.",
			});
		},
		onError: (error) => {
			toast({
				title: "Error creating review",
				description: error.message,
			});
		},
	});

	const useGetReviews = (bookId: string) =>
		useQueryHandler({
			queryKey: ["reviews"],
			queryFn: async () => {
				const response = await axios.get<{ data: ReviewI[] }>(
					`/reviews/${bookId}`,
				);
				return response.data.data || [];
			},
			onError: (error) => {
				toast({
					title: "Error fetching reviews",
					description: error.message,
				});
			},
		});

	const deleteReview = useMutation({
		mutationFn: async (reviewId: string) => {
			queryClient.setQueryData(["reviews"], (prev: ReviewI[]) =>
				prev.filter((review: ReviewI) => review?._id !== reviewId),
			);

			await axios.delete(`/reviews/${reviewId}`);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["reviews"],
			});
			toast({
				title: "Review deleted",
				description: "Your review has been successfully deleted.",
			});
		},
		onError: (error) => {
			toast({
				title: "Error deleting review",
				description: error.message,
			});
		},
	});

	const updateReview = useMutation({
		mutationFn: async (review: any) => {
			queryClient.setQueryData(["reviews"], (prev: ReviewI[]) =>
				prev.map((item: ReviewI) =>
					item?._id === review?._id
						? { ...item, message: review?.message, rating: review?.rating }
						: item,
				),
			);

			const response = await axios.put(`/reviews/${review._id}`, review);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["reviews"],
			});
			toast({
				title: "Review updated",
				description: "Your review has been successfully updated.",
			});
		},
		onError: (error) => {
			toast({
				title: "Error updating review",
				description: error.message,
			});
		},
	});

	return {
		createReview,
		useGetReviews,
		deleteReview,
		updateReview,
	};
};

export default useReviewsService;
