import { FC } from "react";
import { useTranslation } from "react-i18next";

import Card from "../card";
import { DeliveryMethodI } from "@/types";
import { useUserApi } from "@/services/user-api";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { DeliveryItem, LoadingSkeleton } from "./customs";

const DeliveryMethods: FC = () => {
	const { t } = useTranslation();
	const isOnline = useOnlineStatus();
	const { useGetDeliveryMethods } = useUserApi();

	const {
		data: deliveryMethodsData,
		isLoading,
		isError,
	} = useGetDeliveryMethods();

	const loading = isLoading || isError || !isOnline;

	return (
		<Card title={t("checkout.delivery_method") + "*"}>
			<div className="grid md:grid-cols-3 gap-4">
				{loading ? (
					<LoadingSkeleton />
				) : (
					deliveryMethodsData?.map((method: DeliveryMethodI) => (
						<DeliveryItem key={method._id} method={method} />
					))
				)}
			</div>
		</Card>
	);
};

export default DeliveryMethods;
