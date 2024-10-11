import { UserCheckoutInfo } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
	userInfo: UserCheckoutInfo;
	delivery: number;
	couponCode: number;
	discount: number;
	agree_to_rules: boolean;
}

const initialState: InitialStateI = {
	agree_to_rules: false,
	delivery: 0,
	couponCode: 0,
	discount: 0,
	userInfo: {
		name: "",
		surname: "",
		phoneNumber: "",
		delivery_method: "courier",
		payment_method: "payme",
		extra_note: "",
		billingAddress: {
			region: "",
			district: "",
			extraAddress: "",
		},
	},
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		setUserInfo: (state, action) => {
			state.userInfo = { ...state.userInfo, ...action.payload };
		},
		setDelivery: (state, action) => {
			state.delivery = action.payload;
		},
		setCouponCode: (state, action) => {
			state.couponCode = action.payload;
		},
		setDiscount: (state, action) => {
			state.discount = action.payload;
		},
		setAgreeToRules: (state, action) => {
			state.agree_to_rules = action.payload;
		},
		resetCheckout: () => initialState,
	},
});

export const {
	setUserInfo,
	setDelivery,
	setCouponCode,
	setDiscount,
	setAgreeToRules,
	resetCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
