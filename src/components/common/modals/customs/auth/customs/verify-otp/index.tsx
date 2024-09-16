import React from "react";

import { formatTime } from "@/helpers";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import useVerifyOTPFeatures from "./features";

const VerifyOtp: React.FC = () => {
	const {
		timeRemaining,
		loading,
		handleResend,
		handleVerify,
		setOtpNumber,
		data,
	} = useVerifyOTPFeatures();

	return (
		<div className="w-full flex flex-col items-center gap-2">
			{/* OTP Code and Countdown */}
			{timeRemaining !== null && timeRemaining > 0 ? (
				<p>{formatTime(timeRemaining)}</p>
			) : (
				<p>00:00</p>
			)}

			{/* OTP Input Fields */}
			<InputOTP
				maxLength={6}
				pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
				className="bg-[crimson] w-full"
				onChange={(e: string) => setOtpNumber(e)}
			>
				<InputOTPGroup className="w-full">
					{Array.from({ length: 6 }, (_, index) => (
						<InputOTPSlot
							key={index}
							index={index}
							className="w-[50px] h-[50px] text-[18px]"
						/>
					))}
				</InputOTPGroup>
			</InputOTP>
			<span>
				{timeRemaining !== null && timeRemaining > 0
					? data?.otpCode
					: "OTP code expired"}
			</span>
			<Button
				onClick={handleVerify}
				disabled={loading}
				type="submit"
				variant="default"
				className="bg-[#EF7F1A] w-full mt-6"
			>
				{loading ? "Verifying..." : "Verify"}
			</Button>
			{timeRemaining === null ||
				(timeRemaining <= 0 && (
					<Button variant="ghost" className="w-full" onClick={handleResend}>
						Resend
					</Button>
				))}
		</div>
	);
};

export default VerifyOtp;
