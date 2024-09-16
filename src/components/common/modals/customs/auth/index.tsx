import type React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { SignIn, SignUp, VerifyOtp } from "./customs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import logoIcon from "@/assets/icons/logo.svg";
import closeIcon from "@/assets/icons/close-blue.svg";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";

const AuthModalVisibility: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authModalVisibility } = useAppSelector((state) => state.modal);

	const { open, authType } = authModalVisibility;

	const handleClose = () => {
		dispatch(toggleAuthModalVisibility({ open: false, authType: "sign-in" }));
	};

	const navigateToSignUp = () => {
		dispatch(toggleAuthModalVisibility({ authType: "sign-up" }));
	};

	const navigateToSignIn = () => {
		dispatch(toggleAuthModalVisibility({ authType: "sign-in" }));
	};

	return (
		<Dialog open={open}>
			<DialogContent className="max-w-[400px]">
				<DialogHeader>
					<div className="flex items-start justify-between mb-4">
						<img
							src={logoIcon}
							alt="Logo"
							className="max-w-[71px] max-h-[48px]"
						/>

						<img
							src={closeIcon}
							alt="close"
							className="w-[20px] h-[20px]"
							onClick={handleClose}
						/>
					</div>
					<div className="flex flex-col gap-3">
						<DialogTitle>
							{authType === "sign-in"
								? "Telefon raqamingizni kiriting"
								: authType === "sign-up"
									? "Ro'yxatdan o'tish"
									: "Otpni tasdiqlash"}
						</DialogTitle>
						{authType === "sign-in" && (
							<DialogDescription>
								Telefon raqamingizni kiriting va biz sizga bir martalik SMS-kod
								yuboramiz{" "}
							</DialogDescription>
						)}
						{authType !== "sign-in" && authType !== "sign-up" && (
							<DialogDescription>
								Telefoningizga yuborilgan bir martalik SMS-kodni kiriting
							</DialogDescription>
						)}
					</div>
				</DialogHeader>
				<div>
					{authType === "sign-in" ? (
						<SignIn />
					) : authType === "sign-up" ? (
						<SignUp />
					) : (
						<VerifyOtp />
					)}
				</div>

				<>
					{authType === "sign-in" ? (
						<p className="font-normal" onClick={navigateToSignUp}>
							Akkauntingiz yo‘qmi?{" "}
							<span className="text-[#107FE4]">Ro'yhatdan o'ting</span>
						</p>
					) : authType === "sign-up" ? (
						<p className="font-normal" onClick={navigateToSignIn}>
							Ro'yhatdan o'tganmisiz ?{" "}
							<span className="text-[#107FE4]">Kirish</span>
						</p>
					) : (
						<p className="font-normal" onClick={navigateToSignUp}>
							Akkauntingiz yo‘qmi?{" "}
							<span className="text-[#107FE4]">Ro'yhatdan o'ting</span>
						</p>
					)}
				</>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModalVisibility;
