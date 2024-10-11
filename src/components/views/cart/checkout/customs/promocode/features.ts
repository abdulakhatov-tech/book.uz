import {
	useEffect,
	useState,
	ChangeEvent,
	KeyboardEvent,
	FormEvent,
} from "react";

import { useUserApi } from "@/services/user-api";
import { setCouponCode } from "@/redux/slices/checkout";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { couponCodes } from "@/utils/promocode";

const useCouponCodeFeatures = () => {
	const dispatch = useAppDispatch();
	const { applyCoupon } = useUserApi();
	const { couponCode } = useAppSelector((state) => state.checkout);

	const [coupon, setCoupon] = useState<string>("");
	const [copyMessage, setCopyMessage] = useState("");
	const [suggestedCoupon, setSuggestedCoupon] = useState<string>("");

	const { cart } = useAppSelector((state) => state.cart);

	// Calculate the total amount in the cart
	useEffect(() => {
		dispatch(setCouponCode(""));

		const totalCartAmount = cart?.reduce(
			(acc, item) => acc + item?.bookPrice * item?.amount,
			0,
		);

		// Function to calculate the best coupon based on the total amount
		const calculateDiscount = (totalAmount: number): string => {
			const validCoupon = couponCodes
				.filter((c) => c.isActive) // Only active coupons
				.reverse() // Reverse to prioritize higher discounts
				.find((c) => totalAmount >= c.minPrice);

			return validCoupon?.couponCode ?? ""; // Return the coupon code or an empty string
		};

		setSuggestedCoupon(calculateDiscount(totalCartAmount));
		console.log(suggestedCoupon, "suggestedCoupon");
	}, [cart]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCoupon(e.target.value.trim());
	};

	const applyCouponCode = () => {
		if (coupon) {
			applyCoupon.mutate(coupon);
			setCoupon("");
		}
	};

	const handleApplyCoupon = (e: FormEvent) => {
		e.preventDefault();
		applyCouponCode();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			applyCouponCode();
		}
	};

	useEffect(() => {
		if (applyCoupon.data?.discount) {
			dispatch(setCouponCode(applyCoupon.data.discount));
		}
	}, [applyCoupon.data, dispatch]);

	const handleCopyCoupon = () => {
		if (suggestedCoupon) {
			navigator.clipboard.writeText(suggestedCoupon).then(
				() => {
					setCopyMessage("Coupon code copied!");
					setTimeout(() => setCopyMessage(""), 2000); // Clear message after 2 seconds
				},
				(err) => {
					console.error("Could not copy text: ", err);
				},
			);
		}
	};

	return {
		coupon,
		couponCode,
		applyCoupon,
		copyMessage,
		handleChange,
		handleKeyDown,
		suggestedCoupon,
		handleCopyCoupon,
		handleApplyCoupon,
	};
};

export default useCouponCodeFeatures;
