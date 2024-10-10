import { FC } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import useOrdersService from "@/services/orders";
import classNames from "classnames";

type StatusT = "pending" | "processing" | "delivered" | "canceled";

interface SelectActionProps {
	status: StatusT;
	orderId: string;
}

const SelectAction: FC<SelectActionProps> = ({ orderId, status }) => {
	const { t } = useTranslation();
	const { updateOrderStatus } = useOrdersService();

	const handleStatusChange = async (newStatus: StatusT) => {
		await updateOrderStatus.mutate({ orderId, status: newStatus });
	};

	const getItemClassNames = (itemStatus: StatusT) =>
		classNames("px-8 py-2 transition-all duration-200 ease-in-out", {
			"bg-slate-200 text-black": status === itemStatus,
		});

	return (
		<Select onValueChange={handleStatusChange}>
			<SelectTrigger className="w-[150px] p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-lg focus:ring-2 focus:ring-slate-200 transition-all duration-300 ease-in-out">
				<SelectValue placeholder={t(`profile.orders.${status}`)} />
			</SelectTrigger>
			<SelectContent className="bg-white font-semibold border border-gray-200 rounded-md shadow-md mt-2">
				{(["pending", "processing", "delivered", "canceled"] as StatusT[]).map(
					(itemStatus) => (
						<SelectItem
							key={itemStatus}
							value={itemStatus}
							className={getItemClassNames(itemStatus)}
						>
							{t(`profile.orders.${itemStatus}`)}
						</SelectItem>
					),
				)}
			</SelectContent>
		</Select>
	);
};

export default SelectAction;
