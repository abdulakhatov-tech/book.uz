import { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { IoIosCash } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";

import { PaymentMethodI } from "@/types";
import { setUserInfo } from "@/redux/slices/checkout";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const DeliveryItem: FC<{ method: PaymentMethodI }> = ({ method }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.checkout);

	const { type } = method;
	const { payment_method } = userInfo;

	const handleSelect = (payment_method: "payme" | "cash" | "click") => {
		dispatch(setUserInfo({ ...userInfo, payment_method }));
	};

	return (
		<div
			className={classNames("p-5 rounded-[8px] cursor-pointer", {
				"bg-secondary-blue": payment_method === type,
				"bg-secondary-gray": payment_method !== type,
			})}
			onClick={() => handleSelect(type)}
		>
			<div className="flex items-center gap-2">
				{type === "payme" ? (
					<FaCreditCard
						className={classNames("text-[26px]", {
							"text-blue": payment_method === "payme",
							"text-[#5D5D5D]": payment_method !== "payme",
						})}
					/>
				) : type === "cash" ? (
					<IoIosCash
						className={classNames("text-[26px]", {
							"text-blue": payment_method === "cash",
							"text-[#5D5D5D]": payment_method !== "cash",
						})}
					/>
				) : (
					<FaCreditCard
						className={classNames("text-[22px]", {
							"text-blue": payment_method === "click",
							"text-[#5D5D5D]": payment_method !== "click",
						})}
					/>
				)}

				<h4
					className={classNames("text-[16px] font-semibold leading-[19.36px]", {
						"text-blue": payment_method === type,
						"text-secondary-black": payment_method !== type,
					})}
				>
					{t(`checkout.${type}`)}
				</h4>
			</div>
			<p
				className={classNames("text-[14px] font-normal leading-[18.2px] mt-2", {
					"text-blue": payment_method === type,
					"text-gray": payment_method !== type,
				})}
			>
				{t(`checkout.${type}_description`)}
			</p>
		</div>
	);
};

export default DeliveryItem;
