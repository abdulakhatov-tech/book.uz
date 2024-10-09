import { FC } from "react";
import { useTranslation } from "react-i18next";

import Section from "@/layout/section";
import Container from "@/layout/container";

import { CartItemI } from "@/types";
import useLoading from "@/utils/custom-loading";
import { useAppSelector } from "@/hooks/useRedux";
import {
	CartItem,
	LoadingSkeleton,
	RecommendedBooks,
	Summary,
} from "./customs";

const CartComponent: FC = () => {
	const { t } = useTranslation();
	const { cart } = useAppSelector((state) => state.cart);
	const { isLoading } = useLoading();

	return (
		<Section id="cart" className="pt-4 pb-[80px] md:pb-[100px]">
			<Container>
				<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-[34.13px] text-black mb-4">
					{t("cart.title")}
				</h3>

				<div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_287px] gap-6">
					{cart?.length ? (
						<div className="grid grid-cols-1 gap-6 h-fit max-h-[800px] thin-scrollbar">
							{isLoading ? (
								<LoadingSkeleton />
							) : (
								cart?.map((book: CartItemI) => (
									<CartItem key={book._id} book={book} />
								))
							)}
						</div>
					) : (
						<h4 className="text-center mt-8 text-[16px] font-semibold">
							{t("cart.no_books_found")}!
						</h4>
					)}
					<Summary />
				</div>

				<RecommendedBooks />
			</Container>
		</Section>
	);
};

export default CartComponent;
