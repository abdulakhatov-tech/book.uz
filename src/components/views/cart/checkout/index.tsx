import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Section from "@/layout/section";
import Container from "@/layout/container";

import {
	Address,
	DeliveryMethods,
	ExtraNote,
	PaymentMethods,
	Promocode,
	Summary,
	UserInformation,
} from "./customs";
import { UserI } from "@/types";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUserInfo } from "@/redux/slices/checkout";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const CheckoutComponent: FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user = useAuthUser<UserI>();

	useEffect(() => {
		const payload = {
			name: user?.name,
			surname: user?.surname,
			phoneNumber: user?.phoneNumber,
			billingAddress: {
				region: user?.billingAddress?.region,
				district: user?.billingAddress?.district,
				extraAddress: user?.billingAddress?.extraAddress,
			},
		};

		dispatch(setUserInfo(payload));
	}, [user]);

	return (
		<Section id="cart" className="pt-4 pb-[80px] md:pb-[100px]">
			<Container>
				<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-[34.13px] text-black mb-4">
					{t("checkout.title")}
				</h3>

				<form onSubmit={(e) => e.preventDefault()}>
					<div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
						<div className="flex flex-col gap-6">
							<UserInformation />
							<DeliveryMethods />
							<Address />
							<PaymentMethods />
							<Promocode />
							<ExtraNote />
						</div>
						<Summary />
					</div>
				</form>
			</Container>
		</Section>
	);
};

export default CheckoutComponent;
