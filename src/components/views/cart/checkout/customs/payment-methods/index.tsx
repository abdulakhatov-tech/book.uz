import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Card from "../card";
import { PaymentMethodI } from "@/types";
import { useUserApi } from "@/services/user-api";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { DeliveryItem, LoadingSkeleton } from "./customs";
import { setUserInfo } from "@/redux/slices/checkout";

const PaymentMethods: FC = () => {
	const { t } = useTranslation();
	const isOnline = useOnlineStatus();
	const dispatch = useAppDispatch();
	const { useGetPaymentMethods } = useUserApi();
	const { userInfo } = useAppSelector((state) => state.checkout);

	const { isLoading, isError, data } = useGetPaymentMethods();
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethodI[]>([]);

	const loading = isLoading || isError || !isOnline;

	useEffect(() => {
		if (!loading && data) {
			const filteredMethods =
				userInfo.delivery_method !== "pickup"
					? data.filter(
							(paymentMethod: PaymentMethodI) => paymentMethod.type !== "cash",
						)
					: data;

			setPaymentMethods(filteredMethods);
		}
		if (userInfo.delivery_method !== "pickup") {
			dispatch(
				setUserInfo({
					...userInfo,
					payment_method: "payme",
				}),
			);
		}
	}, [userInfo.delivery_method, data, loading]);

	return (
		<Card title={t("checkout.payment_method")}>
			<div>
				<div className="grid md:grid-cols-3 gap-4">
					{loading ? (
						<LoadingSkeleton />
					) : (
						paymentMethods?.map((method: PaymentMethodI) => (
							<DeliveryItem key={method._id} method={method} />
						))
					)}
				</div>
			</div>
		</Card>
	);
};

export default PaymentMethods;
