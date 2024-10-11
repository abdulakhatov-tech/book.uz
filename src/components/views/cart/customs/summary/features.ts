import { useNavigate } from "react-router-dom";

import useLoading from "@/utils/custom-loading";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";
import { useState } from "react";

const useSummaryFeatures = () => {
	const navigate = useNavigate();
	const isAuthed = useAuthHeader();
	const dispatch = useAppDispatch();
	const { isLoading } = useLoading();
	const { cart } = useAppSelector((state) => state.cart);
	const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);

	const delivery = 0;
	const discount = cart?.reduce((acc, item) => {
		const itemDiscount =
			((item?.bookPrice * item?.discount) / 100) * item?.amount;
		return acc + itemDiscount;
	}, 0);
	const totalBooks = cart.reduce((sum, item) => sum + item.amount, 0);
	const totalPrice = cart.reduce(
		(sum, item) => sum + item.amount * item.bookPrice,
		0,
	);
	const totalPriceWithDelivery = totalPrice + delivery;
	const totalPriceWithDiscount = totalPriceWithDelivery - discount;

	const checkoutHandler = () => {
		if (isLoading) {
			return;
		}

		if (!isAuthed) {
			dispatch(
				toggleAuthModalVisibility({
					open: true,
				}),
			);
		}

		setLoadingCheckout(true);

		setTimeout(() => {
			if (cart.length) {
				navigate("/cart/checkout");
			} else {
				navigate("/");
			}
			setLoadingCheckout(false);
		}, 1000);
	};

	return {
		delivery,
		discount,
		isLoading,
		totalBooks,
		totalPrice,
		loadingCheckout,
		checkoutHandler,
		totalPriceWithDiscount,
	};
};

export default useSummaryFeatures;
