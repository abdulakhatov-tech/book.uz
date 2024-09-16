import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSignInFeatures from "./features";

const SignIn: React.FC = () => {
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
				<p className="text-crimson text-sm font-normal text-center text-[crimson] mt-1">
					{phoneError}
				</p>
			)}
			<Button
				type="submit"
				variant="default"
				className="bg-[#EF7F1A] w-full mt-6"
				disabled={isLoading} // Disable button while loading
			>
				{isLoading ? "Loading..." : "Kirish"}
			</Button>
		</form>
	);
};

export default SignIn;
