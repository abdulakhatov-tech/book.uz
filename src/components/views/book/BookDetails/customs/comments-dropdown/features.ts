import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleReviewDropdownVisibility } from "@/redux/slices/modals";

import { UserI } from "@/types";
import useReviewsService from "@/services/reviews";

const useCommentsDropdownFeatures = () => {
	const dispatch = useAppDispatch();
	const user: UserI | null = useAuthUser();
	const { createReview, updateReview } = useReviewsService();
	const { reviewsDropdownVisibility } = useAppSelector((state) => state.modal);

	const { open, reviewType, review } = reviewsDropdownVisibility;

	const [rating, setRating] = useState<number>(0);
	const [message, setMessage] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	// Initialize form state on modal open
	useEffect(() => {
		if (open) {
			if (reviewType === "edit") {
				setMessage(review.message || "");
				setRating(review.rating || 0);
			} else {
				// Reset state for "create" mode
				setMessage("");
				setRating(0);
			}
		}
	}, [open]);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	const handleClose = () => {
		if (!loading) {
			dispatch(
				toggleReviewDropdownVisibility({
					open: false,
					bookId: "null",
					review: null,
					reviewType: "create",
				}),
			);
			// Reset form state
			setMessage("");
			setRating(0);
		}
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const reviewData = {
			userId: user?._id,
			message,
			rating,
		};

		if (reviewType === "edit" && review) {
			updateReview.mutate(
				{
					...review,
					...reviewData,
				},
				{
					onSuccess: () => {
						setMessage("");
						setRating(0);
						handleClose();
						toast({
							title: "Comment updated successfully",
						});
					},
					onSettled: () => {
						setLoading(false);
					},
				},
			);
		} else {
			createReview.mutate(
				{
					...reviewData,
					bookId: reviewsDropdownVisibility.bookId,
				},
				{
					onSuccess: () => {
						setMessage("");
						setRating(0);
						handleClose();
						toast({
							title: "Commented successfully",
						});
					},
					onSettled: () => {
						setLoading(false);
					},
				},
			);
		}
	};

	return {
		open,
		message,
		loading,
		onChange,
		onSubmit,
		setRating,
		reviewType,
		handleClose,
		rating,
	};
};

export default useCommentsDropdownFeatures;
