import { useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import {
	addBookToWishlist,
	removeBookFromWishlist,
} from "@/redux/slices/wishlist";
import { BookI, CartItemI } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";
import {
	decrementBookAmount,
	incrementBookAmount,
	removeFromCart,
} from "@/redux/slices/cart";

const useCartItemFeatures = ({ book }: { book: CartItemI | BookI }) => {
	const isAuthed = useAuthHeader();
	const dispatch = useAppDispatch();
	const { bookmark } = useAppSelector((state) => state.wishlist);
	const { error } = useAppSelector((state) => state.cart);

	const isBookInWishlist = bookmark?.some(
		(b: BookI | CartItemI) => b._id === book._id,
	);

	useEffect(() => {
		if (error) {
			toast({
				title: book.name,
				description: error,
			});
		}
	}, [error]);

	const handleWishlist = () => {
		if (!isAuthed) {
			dispatch(
				toggleAuthModalVisibility({
					open: true,
				}),
			);

			return;
		}

		if (isBookInWishlist) {
			dispatch(removeBookFromWishlist(book));
		} else {
			dispatch(addBookToWishlist(book));
		}
	};

	const handleRemoveFromCart = () => {
		if (!isAuthed) {
			dispatch(
				toggleAuthModalVisibility({
					open: true,
				}),
			);

			return;
		}

		dispatch(removeFromCart(book._id));
	};

	const incrementBookAmountHandler = () => {
		if (!isAuthed) {
			dispatch(
				toggleAuthModalVisibility({
					open: true,
				}),
			);

			return;
		}

		dispatch(incrementBookAmount(book._id));
	};

	const decrementBookAmountHandler = () => {
		if (!isAuthed) {
			dispatch(
				toggleAuthModalVisibility({
					open: true,
				}),
			);

			return;
		}

		dispatch(decrementBookAmount(book._id));
	};
	return {
		isBookInWishlist,
		handleWishlist,
		handleRemoveFromCart,
		incrementBookAmountHandler,
		decrementBookAmountHandler,
	};
};

export default useCartItemFeatures;
