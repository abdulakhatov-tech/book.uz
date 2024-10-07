import { FC, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Card from "../card";
import { UserI } from "@/types";
import { setUserInfo } from "@/redux/slices/checkout";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const UserInformation: FC = () => {
	const user: UserI | null = useAuthUser();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.checkout);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(setUserInfo({ ...userInfo, [name]: value }));
	};

	return (
		<Card title={`${t("checkout.information")} *`}>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<Label
						htmlFor="name"
						className="text-[16px] font-semibold leading-[19.36px] text-[#828282]"
					>
						{t("checkout.name")}
					</Label>
					<Input
						id="name"
						className="mt-2 text-[16px] font-semibold leading-[24px]"
						type="text"
						name="name"
						required
						value={userInfo?.name || user?.name}
						onChange={handleInputChange}
						aria-label={t("checkout.name")}
					/>
				</div>
				<div>
					<Label
						htmlFor="surname"
						className="text-[16px] font-semibold leading-[19.36px] text-[#828282]"
					>
						{t("checkout.surname")}
					</Label>
					<Input
						id="surname"
						className="mt-2 text-[16px] font-semibold leading-[24px]"
						type="text"
						name="surname"
						required
						value={userInfo?.surname || user?.surname}
						onChange={handleInputChange}
						aria-label={t("checkout.surname")}
					/>
				</div>
				<div>
					<Label
						htmlFor="phoneNumber"
						className="text-[16px] font-semibold leading-[19.36px] text-[#828282]"
					>
						{t("checkout.phone_number")}
					</Label>
					<Input
						id="phoneNumber"
						className="mt-2 text-[16px] font-semibold leading-[24px]"
						type="tel"
						name="phoneNumber"
						required
						value={userInfo?.phoneNumber || user?.phoneNumber}
						pattern="^\+?[0-9\s\-]*$"
						onChange={handleInputChange}
						aria-label={t("checkout.phone_number")}
					/>
				</div>
			</div>
		</Card>
	);
};

export default UserInformation;
