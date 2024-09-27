import type React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import useAuthFeatures from "./features";
import { AuthFooter, AuthHeader, SignIn, SignUp, VerifyOtp } from "./customs";

const AuthModalVisibility: React.FC = () => {
	const { open, authType } = useAuthFeatures();

	return (
		<Dialog open={open}>
			<DialogContent className="w-[90%] max-w-[350px] md:max-w-[400px] rounded-[10px]">
				<AuthHeader />
				<div className="w-full">
					{authType === "sign-in" ? (
						<SignIn />
					) : authType === "sign-up" ? (
						<SignUp />
					) : (
						<VerifyOtp />
					)}
				</div>

				<AuthFooter />
			</DialogContent>
		</Dialog>
	);
};

export default AuthModalVisibility;
