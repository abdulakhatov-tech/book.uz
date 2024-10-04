import { FC } from "react";
import { Link } from "react-router-dom";

import { FaHeart } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";

import { BookI } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
	addBookToWishlist,
	removeBookFromWishlist,
} from "@/redux/slices/wishlist";

const ActionButtons: FC<{
	book: BookI;
}> = ({ book }) => {
	const dispatch = useAppDispatch();
	const wishlist = useAppSelector((state) => state.wishlist.bookmark);

	const isBookInWishlist = wishlist.some((b: BookI) => b._id === book._id);

	const handleWishlist = () => {
		if (isBookInWishlist) {
			dispatch(removeBookFromWishlist(book));
		} else {
			dispatch(addBookToWishlist(book));
		}
	};

	return (
		<div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1">
			<div
				onClick={handleWishlist}
				className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange`}
			>
				{isBookInWishlist ? (
					<FaHeart className="text-[16px] md:text-[18px] text-crimson hover:text-white" />
				) : (
					<IoMdHeartEmpty className="text-[18px] md:text-[20px] text-black hover:text-white" />
				)}
			</div>
			<div
				className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange`}
			>
				<FaShoppingBasket className="text-[16px] md:text-[18px] text-black hover:text-white" />
			</div>
			<Link to={`/books/details/${book._id}`}>
				<div
					className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange`}
				>
					<GrSearch className="text-[16px] md:text-[18px] text-black hover:text-white" />
				</div>
			</Link>
		</div>
	);
};

export default ActionButtons;
