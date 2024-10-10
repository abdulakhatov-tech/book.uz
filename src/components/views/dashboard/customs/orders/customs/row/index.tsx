import React from "react";
import { useTranslation } from "react-i18next";
import { PhotoProvider, PhotoView } from "react-photo-view";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaRegUser } from "react-icons/fa";
import { TableCell, TableRow } from "@/components/ui/table";

import { OrderRowPropsI } from "./interface";
import useAuthorsService from "@/services/authors";
import { formatDate, formatPrice } from "@/helpers";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import SelectAction from "../select-action";

const OrderRow: React.FC<OrderRowPropsI> = ({ order, index }) => {
	const { t } = useTranslation();
	const { deleteAuthorById } = useAuthorsService();
	return (
		<TableRow>
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell className="flex items-center gap-3">
				<div className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-[#BC8E5B] text-white">
					{order?.user?.profilePhoto ? (
						<PhotoProvider>
							<PhotoView src={order?.user?.profilePhoto}>
								<img
									src={order?.user?.profilePhoto}
									className="w-full h-full object-cover"
									alt={order?.user?.name}
								/>
							</PhotoView>
						</PhotoProvider>
					) : (
						<FaRegUser />
					)}
				</div>
				{order?.user?.surname} {order?.user?.name}
			</TableCell>
			<TableCell>{order?.billingAddress?.extraAddress || 0}</TableCell>
			<TableCell>{formatDate(order?.createdAt)}</TableCell>
			<TableCell>
				{formatPrice(order?.price)} {t("dashboard.orders.sum")}
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<div
						className={classNames(
							"flex items-center justify-center w-6 h-6 border rounded-full shadow-md transition-transform duration-200 transform hover:scale-105",
							{
								"border-crimson": order?.status === "canceled",
								"bg-green-500": order?.status === "delivered",
								"bg-yellow-400": order?.status === "processing",
								"bg-slate-300": order?.status === "pending",
							},
						)}
					>
						<div
							className={classNames("w-4 h-4 rounded-full shadow-inner", {
								"bg-crimson": order?.status === "canceled",
								"bg-green-600": order?.status === "delivered",
								"bg-yellow-300": order?.status === "processing",
								"bg-slate-200": order?.status === "pending",
							})}
						></div>
					</div>
					<span
						className={classNames("font-semibold capitalize tracking-wide", {
							"text-crimson": order?.status === "canceled",
							"text-green-500": order?.status === "delivered",
							"text-yellow-400": order?.status === "processing",
							"text-slate-500": order?.status === "pending",
						})}
					>
						{order?.status}
					</span>
				</div>
			</TableCell>

			<TableCell className="flex items-center justify-end gap-2">
				<SelectAction orderId={order?._id} status={order?.status} />
			</TableCell>
		</TableRow>
	);
};
export default OrderRow;
