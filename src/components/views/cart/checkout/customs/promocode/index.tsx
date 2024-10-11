import { FC } from "react";
import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { MdDone } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Card from "../card";
import LoadingSpinner from "@/tools/loading-spinner";
import useCouponCodeFeatures from "./features";

const Promocode: FC = () => {
	const { t } = useTranslation();
	const {
		coupon,
		couponCode,
		applyCoupon,
		copyMessage,
		handleChange,
		handleKeyDown,
		suggestedCoupon,
		handleCopyCoupon,
		handleApplyCoupon,
	} = useCouponCodeFeatures();

	return (
		<Card title={t("checkout.coupon_code")}>
			<div className="mb-4">
				{suggestedCoupon && (
					<div
						onClick={handleCopyCoupon}
						className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md border border-gray-300 "
					>
						<span className="text-md font-medium text-gray-600">
							{suggestedCoupon || "No coupon"}
						</span>

						{copyMessage && (
							<span className="text-green-500 text-sm font-medium text-gray-600">
								{copyMessage}
							</span>
						)}
					</div>
				)}
			</div>

			<div className="flex items-center gap-4">
				<Input
					value={coupon}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					className="max-w-[300px]"
					disabled={!!couponCode || !suggestedCoupon}
				/>
				<Button
					onClick={handleApplyCoupon}
					type="button"
					className="bg-orange hover:bg-orange"
					disabled={
						!!couponCode || applyCoupon.status === "pending" || !suggestedCoupon
					}
				>
					{applyCoupon.status === "pending" ? (
						<LoadingSpinner />
					) : couponCode ? (
						<>
							<MdDone className="text-[22px] mr-1" />
							{t("checkout.coupon_code_applied")}
						</>
					) : (
						t("checkout.use_promo_code")
					)}
				</Button>
			</div>

			<p className="mt-2 text-secondary-black font-normal text-[16px]">
				{applyCoupon.isError ? (
					<span className="text-red-500">
						{applyCoupon?.error && isAxiosError(applyCoupon.error)
							? applyCoupon.error.response?.data?.message ||
								"Something went wrong!"
							: "Something went wrong!"}
					</span>
				) : couponCode ? (
					<>
						{t("checkout.coupon_code_applied_message")}{" "}
						<strong>{couponCode}%</strong>{" "}
						{t("checkout.coupon_code_discount_message")}
					</>
				) : (
					""
				)}
			</p>
		</Card>
	);
};

export default Promocode;
