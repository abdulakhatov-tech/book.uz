import { useNavigate } from "react-router-dom";

import useLoading from "@/utils/custom-loading";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";
import { useState } from "react";
import { setAgreeToRules } from "@/redux/slices/checkout";

const useSummaryFeatures = () => {
	const navigate = useNavigate();
	const isAuthed = useAuthHeader();
	const dispatch = useAppDispatch();
	const { isLoading } = useLoading();
	const { cart } = useAppSelector((state) => state.cart);
	const { delivery, discount, couponCode, agree_to_rules } = useAppSelector(
		(state) => state.checkout,
	);
	const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);

	const totalBooks = cart.reduce((sum, item) => sum + item.amount, 0);
	const totalPrice = cart.reduce(
		(sum, item) => sum + item.amount * item.bookPrice,
		0,
	);
	const totalPriceWithDelivery =
		totalPrice +
		delivery -
		(totalPrice + delivery) * (Number(couponCode) / 100);
	const couponCodePercentageToPrice = couponCode
		? (totalPrice + delivery) * (Number(couponCode) / 100)
		: 0;
	const totalPriceWithDiscount = totalPriceWithDelivery - discount;

	const agreeTermsOfRules = (value: boolean) => {
		dispatch(setAgreeToRules(value));
	};

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
		couponCode,
		agree_to_rules,
		loadingCheckout,
		checkoutHandler,
		agreeTermsOfRules,
		totalPriceWithDiscount,
		couponCodePercentageToPrice,
	};
};

export default useSummaryFeatures;
