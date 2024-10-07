import { UserCheckoutInfo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    region: "",
    district: "",
    address: "",
    payment_method: "payme",
    couponCode: "",
    extra_note: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserCheckoutInfo>) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    setDelivery: (state, action: PayloadAction<number>) => {
      state.delivery = action.payload;
    },
    setCouponCode: (state, action: PayloadAction<number>) => {
      state.couponCode = action.payload;
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    setAgreeToRules: (state, action: PayloadAction<boolean>) => {
      state.agree_to_rules = action.payload;
    },
  },
});

export const { setUserInfo,  setDelivery, setCouponCode, setDiscount, setAgreeToRules } = checkoutSlice.actions;

export default checkoutSlice.reducer;
