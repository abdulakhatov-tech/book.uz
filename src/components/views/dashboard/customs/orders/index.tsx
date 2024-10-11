import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { OrderI } from "@/types";
import Section from "@/layout/section";
import useOrdersService from "@/services/orders";
import { LoadingRows, OrderRow } from "./customs";

const OrdersComponent: FC = () => {
	const { t } = useTranslation();
	const { useGetAllOrders } = useOrdersService();
	const { isLoading, isError, data } = useGetAllOrders();

	return (
		<Section id="dashboard-orders">
			<h2 className="text-[22px] text-black font-bold mb-4">
				{t("dashboard.orders.title")}
			</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px] font-bold text-[18px] text-secondary-black">
							№
						</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">
							{t("dashboard.orders.full_name")}
						</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">
							{t("dashboard.orders.address")}
						</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">
							{t("dashboard.orders.created_at")}
						</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">
							{t("dashboard.orders.price")}
						</TableHead>
						<TableHead className="font-bold text-[18px] text-secondary-black">
							{t("dashboard.orders.status")}
						</TableHead>
						<TableHead className="text-right font-bold text-[18px] text-secondary-black">
							{t("dashboard.users.actions")}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading || isError ? (
						<LoadingRows />
					) : (
						data?.map((order: OrderI, idx: number) => (
							<OrderRow key={order._id} order={order} index={idx} />
						))
					)}
				</TableBody>
			</Table>
		</Section>
	);
};

export default OrdersComponent;
