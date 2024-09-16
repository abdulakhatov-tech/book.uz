import { useAppDispatch } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";
import axios from "axios";
import { useState } from "react";

const useSignUpFeatures = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const surname = formData.get("surname")?.toString().trim();
    const phoneNumber =
      formData.get("phoneNumber")?.toString().trim().split(" ").join("") || "";

    // Validate phone number
    if (phoneNumber.length !== 13) {
      setPhoneError("Please enter + and a valid 12-digit phone number!");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/auth/sign-up`,
        data: {
          name,
          surname,
          phoneNumber,
        },
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
      setLoading(false);
    }
  };

  return { handleSubmit, loading, phoneError };
};

export default useSignUpFeatures;
