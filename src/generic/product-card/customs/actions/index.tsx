import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import { FaHeart } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";

import {
	addBookToWishlist,
	removeBookFromWishlist,
} from "@/redux/slices/wishlist";
import { BookI, CartItemI } from "@/types";
import { addToCart } from "@/redux/slices/cart";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const ActionButtons: FC<{
	book: BookI;
}> = ({ book }) => {
	const isAuthed = useAuthHeader();
	const dispatch = useAppDispatch();
	const { error } = useAppSelector((state) => state.cart);
	const { bookmark } = useAppSelector((state) => state.wishlist);

	const isBookInWishlist = bookmark?.some(
		(b: BookI | CartItemI) => b._id === book._id,
	);

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

	const handleAddToCart = () => {
		if (!isAuthed) {
			dispatch(
				toggleAuthModalVisibility({
					open: true,
				}),
			);

			return;
		}

		dispatch(addToCart(book));
		toast({
			title: book.name,
			description: "Added to Cart",
		});
	};

	useEffect(() => {
		if (error) {
			toast({
				title: book.name,
				description: error,
			});
		}
	}, [error]);

	return (
		<div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1 cursor-pointer">
			<div
				onClick={handleWishlist}
				className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange text-black hover:text-white`}
			>
				{isBookInWishlist ? (
					<FaHeart className="text-[16px] md:text-[18px] text-crimson" />
				) : (
					<IoMdHeartEmpty className="text-[18px] md:text-[20px] text-black hover:text-white" />
				)}
			</div>
			<div
				onClick={handleAddToCart}
				className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange text-black hover:text-white`}
			>
				<FaShoppingBasket className="text-[16px] md:text-[18px] " />
			</div>
			<Link to={`/books/details/${book._id}`}>
				<div
					className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange text-black hover:text-white`}
				>
					<GrSearch className="text-[16px] md:text-[18px] " />
				</div>
			</Link>
		</div>
	);
};

export default ActionButtons;
