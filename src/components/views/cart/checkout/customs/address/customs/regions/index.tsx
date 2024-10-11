import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import Loading from "../loading";
import { RegionI } from "@/types";
import { useUserApi } from "@/services/user-api";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { setUserInfo } from "@/redux/slices/checkout";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const SelectRegions: FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isOnline = useOnlineStatus();
	const { useGetRegions } = useUserApi();
	const { userInfo } = useAppSelector((state) => state.checkout);

	const { data: regions, isLoading, isError } = useGetRegions();
	const isDisabled = isLoading || isError || !isOnline;

	const handleValueChange = (value: string) => {
		if (!isDisabled) {
			dispatch(
				setUserInfo({
					billingAddress: {
						...userInfo.billingAddress,
						region: value,
					},
				}),
			);
		}
	};

	return (
		<div>
			<Label
				htmlFor="regions"
				className="text-[16px] font-semibold leading-[19.36px] text-[#828282] mb-2 block"
			>
				{t("checkout.region")}
			</Label>
			<Select
				value={userInfo.billingAddress.region}
				onValueChange={handleValueChange}
				disabled={isDisabled}
			>
				<SelectTrigger className="w-full font-semibold">
					<SelectValue
						className="font-semibold"
						placeholder={t("checkout.region")}
					/>
				</SelectTrigger>
				<SelectContent className="max-h-[300px]">
					{isDisabled ? (
						<Loading />
					) : (
						regions?.map(({ _id, name }: RegionI) => (
							<SelectItem key={_id} value={_id} className="font-semibold">
								{name}
							</SelectItem>
						))
					)}
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectRegions;
