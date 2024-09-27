import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";

const useVerifyOTPFeatures = () => {
	const signIn = useSignIn();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { authModalVisibility } = useAppSelector((state) => state.modal);
	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [otpNumber, setOtpNumber] = useState<string | null>(null);

	const { data } = authModalVisibility;

	// Initialize countdown timer
	useEffect(() => {
		if (data?.activeOtpTime) {
			const targetTime = Date.now() + data.activeOtpTime;

			const updateCountdown = () => {
				const timeLeft = targetTime - Date.now();
				setTimeRemaining(timeLeft > 0 ? timeLeft : 0);
			};

			const intervalId = setInterval(updateCountdown, 1000);
			return () => clearInterval(intervalId);
		}
	}, [data?.activeOtpTime, data]);

	// Handle OTP verification
	const handleVerify = async () => {
		if (otpNumber?.length === 6 && data?.phoneNumber) {
			try {
				setLoading(true);
				const response = await axios.post(
					`${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`,
					{
						otpCode: Number(otpNumber), // Cast to number if necessary
						phoneNumber: data.phoneNumber,
					},
				);
				if (response?.data?.data?.token) {
					console.log(response?.data?.data, '--data--')
					const signedIn = signIn({
						auth: {
							token: response?.data?.data?.token,
							type: "Bearer",
						},
						userState: response?.data?.data?.user,
					});

					if (signedIn) {
						toast({
							variant: "default",
							description: "OTP verified successfully",
						});
						dispatch(
							toggleAuthModalVisibility({
								authType: "sign-in",
								open: false,
								data: null,
							}),
						);
						navigate("/");
					} else {
						throw new Error("Invalid OTP");
					}
					setLoading(false);
				} else {
					setLoading(false);
					throw new Error("Invalid OTP");
				}
			} catch (error: any) {
				toast({
					variant: "destructive",
					description:
						error.response?.data?.message || "OTP verification failed",
				});
				setLoading(false);
			}
		} else {
			if (!data?.phoneNumber) {
				toast({
					variant: "destructive",
					description: "Phone number is missing. Please try again.",
				});
				return;
			}
		}
	};

	const handleResend = async () => {
		try {
			const response = await axios({
				method: "POST",
				url: `${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
				data: { phoneNumber: data.phoneNumber },
			});

			setTimeRemaining(null);

			dispatch(
				toggleAuthModalVisibility({
					authType: "verify-otp",
					data: {
						phoneNumber: data.phoneNumber,
						otpCode: response?.data?.otpCode || "",
						activeOtpTime: response?.data?.activeOtpTime || 0,
					},
				}),
			);
		} catch (error) {
			const description =
				error instanceof Error ? error.message : "Failed to resend OTP code";

			toast({
				variant: "destructive",
				description,
			});
		}
	};
	return {
		timeRemaining,
		loading,
		handleResend,
		handleVerify,
		setOtpNumber,
		data,
	};
};

export default useVerifyOTPFeatures;
