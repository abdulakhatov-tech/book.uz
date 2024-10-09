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

const SelectDistrict: FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isOnline = useOnlineStatus();
	const { useGetDistricts } = useUserApi();
	const { userInfo } = useAppSelector((state) => state.checkout);

	const {
		data: districts,
		isLoading,
		isError,
	} = useGetDistricts(userInfo?.billingAddress?.region);
	const isDisabled = isLoading || isError || !isOnline;

	const handleValueChange = (value: string) => {
		if (!isDisabled) {
			dispatch(setUserInfo({ district: value }));
		}
	};

	return (
		<div>
			<Label
				htmlFor="districts"
				className="text-[16px] font-semibold leading-[19.36px] text-[#828282] mb-2 block"
			>
				{t("checkout.district")}
			</Label>
			<Select
				value={userInfo?.billingAddress?.district}
				onValueChange={handleValueChange}
				disabled={!userInfo?.billingAddress?.region || isDisabled}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={t("checkout.district")} />
				</SelectTrigger>
				<SelectContent className="max-h-[300px]">
					{isDisabled ? (
						<Loading />
					) : (
						districts?.map(({ _id, name }: RegionI) => (
							<SelectItem key={_id} value={_id}>
								{name}
							</SelectItem>
						))
					)}
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectDistrict;
