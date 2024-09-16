import axios from "axios";
import { useState } from "react";

import { useAppDispatch } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";

const useSignInFeatures = () => {
  const dispatch = useAppDispatch();
  const [phoneError, setPhoneError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhoneError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const phoneNumber =
      formData.get("phoneNumber")?.toString().trim().split(" ").join("") || "";

    // Validate phone number
    if (phoneNumber.length !== 13) {
      setPhoneError("Please enter + and a valid 12-digit phone number!");
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
        data: { phoneNumber: `${phoneNumber}` },
      });

      dispatch(
        toggleAuthModalVisibility({
          authType: "verify-otp",
          data: {
            phoneNumber,
            otpCode: data?.otpCode || "",
            activeOtpTime: data?.activeOtpTime || 0,
          },
        })
      );
    } catch (error) {
      // Type guard for AxiosError
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again later.";
        setPhoneError(message);
      } else {
        setPhoneError("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    phoneError,
    isLoading,
    handleSubmit,
  };
};

export default useSignInFeatures;
