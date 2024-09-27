import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useSignInFeatures from "./features";
import LoadingSpinner from "@/tools/loading-spinner";

const SignIn: FC = () => {
	const { t } = useTranslation();
	const { phoneError, isLoading, handleSubmit } = useSignInFeatures();

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type="text"
				name="phoneNumber"
				placeholder="+998 99 --- -- --"
				required
				className="w-full"
				disabled={isLoading} // Disable input while loading
			/>
			{phoneError && (
				<p className="text-crimson text-sm font-normal text-center mt-1">
					{phoneError}
				</p>
			)}
			<Button
				type="submit"
				variant="default"
				className="bg-[#EF7F1A] w-full mt-6 text-[16px] md:text-[18px] font-medium leading-[21.78px]"
				disabled={isLoading} // Disable button while loading
			>
				{isLoading ? <LoadingSpinner /> : t("auth.login")}
			</Button>
		</form>
	);
};

export default SignIn;
