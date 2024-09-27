import type React from "react";
import useSignUpFeatures from "./features";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/tools/loading-spinner";

const SignUp: React.FC = () => {
	const { t } = useTranslation();
	const { handleSubmit, loading, phoneError } = useSignUpFeatures();

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4">
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label
					htmlFor="picture"
					className="text-[14px] md:text-[16px] font-normal leading-[19.36px] text-[#5E5E5E]"
				>
					{t("auth.name")}:
				</Label>
				<Input
					type="text"
					name="name"
					required
					className="w-full"
					disabled={loading} // Disable input while loading
				/>
			</div>

			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label
					htmlFor="picture"
					className="text-[14px] md:text-[16px] font-normal leading-[19.36px] text-[#5E5E5E]"
				>
					{t("auth.surname")}:
				</Label>
				<Input
					type="text"
					name="surname"
					required
					className="w-full"
					disabled={loading} // Disable input while loading
				/>
			</div>

			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label
					htmlFor="picture"
					className="text-[14px] md:text-[16px] font-normal leading-[19.36px] text-[#5E5E5E]"
				>
					{t("auth.phone_number")}:
				</Label>
				<Input
					type="text"
					name="phoneNumber"
					placeholder="+998 99 --- -- --"
					required
					className="w-full"
					disabled={loading} // Disable input while loading
				/>
				{phoneError && (
					<p className="text-crimson text-sm font-normal text-center">
						{phoneError}
					</p>
				)}
			</div>

			<Button
				type="submit"
				variant="default"
				className="bg-[#EF7F1A] w-full mt-4 text-[16px] md:text-[18px] font-medium leading-[21.78px]"
				disabled={loading} // Disable button while loading
			>
				{loading ? <LoadingSpinner /> : t("auth.sign_up_title")}
			</Button>
		</form>
	);
};

export default SignUp;
