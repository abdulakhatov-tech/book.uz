import { useParams } from "react-router-dom";

import { ReviewI } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/useRedux";
import useReviewsService from "@/services/reviews";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { toggleReviewDropdownVisibility } from "@/redux/slices/modals";

const useReviewFeatures = () => {
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const isOnline = useOnlineStatus();
    const { useGetReviews, deleteReview } = useReviewsService();

    const { isLoading, isError, data: reviews } = useGetReviews(slug!);
    const loading = !isOnline || isLoading || isError;

    const handleDelete = (reviewId: string) => {
      deleteReview.mutate(reviewId, {
        onSuccess: () => {
          toast({
            title: "Review deleted successfully",
          })
        }
      })
    }

    const handleUpdate = (review: ReviewI) => {
      dispatch(toggleReviewDropdownVisibility({
        open: true,
        reviewType: "edit",
        review
      }))
    }

  return {
    loading,
    reviews,
    handleDelete,
    handleUpdate
  };
};

export default useReviewFeatures;
