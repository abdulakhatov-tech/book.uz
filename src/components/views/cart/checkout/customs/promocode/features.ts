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

const useCouponCodeFeatures = () => {
	const { applyCoupon } = useUserApi();
	const [coupon, setCoupon] = useState<string>("");
	const dispatch = useAppDispatch();
	const { couponCode } = useAppSelector((state) => state.checkout);

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

	return {
		coupon,
		couponCode,
		applyCoupon,
		handleChange,
		handleKeyDown,
		handleApplyCoupon,
	};
};

export default useCouponCodeFeatures;
