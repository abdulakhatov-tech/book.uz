import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import checkIcon from "@/assets/icons/check.svg";
import { toggleCheckoutSuccessModalVisibility } from "@/redux/slices/modals";

const CheckoutSuccess: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const { checkoutSuccessModalVisibility } = useAppSelector(
		(state) => state.modal,
	);

	// Close modal handler
	const handleClose = () => {
		dispatch(toggleCheckoutSuccessModalVisibility(false));
	};

	// Navigate to profile and close modal
	const handleNavigateToProfile = () => {
		dispatch(toggleCheckoutSuccessModalVisibility(false));
		navigate("/profile/orders", { replace: true });
	};

	return (
		<AlertDialog open={checkoutSuccessModalVisibility}>
			<AlertDialogContent className="max-w-[500px] px-7">
				<AlertDialogHeader className="flex flex-col gap-2">
					<AlertDialogTitle className="flex items-center gap-2 text-blue text-[24px] font-semibold leading-[29.26px]">
						<img src={checkIcon} alt="Success" />
						{t("checkout.order_success_title")}
					</AlertDialogTitle>
					<AlertDialogDescription className="text-[16px] font-normal leading-[22.4px] text-black">
						{t("checkout.order_success_description")}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="grid grid-cols-2 gap-2">
					<AlertDialogCancel
						onClick={handleClose}
						className="py-[22px] bg-gray hover:bg-gray text-[16px] font-normal leading-[19.36px] text-white hover:text-white"
					>
						{t("checkout.order_success_close_btn")}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleNavigateToProfile}
						className="py-[22px] bg-orange hover:bg-orange text-[16px] font-normal leading-[19.36px] text-white"
					>
						{t("checkout.order_success_profile")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CheckoutSuccess;
