import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { formatTime } from "@/helpers";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import useVerifyOTPFeatures from "./features";
import LoadingSpinner from "@/tools/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";

const VerifyOtp: FC = () => {
  const { t } = useTranslation();
  const {
    timeRemaining,
    loading,
    handleResend,
    handleVerify,
    setOtpNumber,
    data,
  } = useVerifyOTPFeatures();

  return (
    <form className='w-full flex flex-col items-center gap-2'>
      {/* Countdown Timer */}
      <p>
        {timeRemaining !== null && timeRemaining > 0
          ? formatTime(timeRemaining)
          : "00:00"}
      </p>

      {/* OTP Input Fields */}
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        className='w-full'
        onChange={(e: string) => setOtpNumber(e)}
      >
        <InputOTPGroup className='w-full grid grid-cols-6 gap-1 md:gap-3'>
          {timeRemaining !== null && timeRemaining > 0 ? Array.from({ length: 6 }, (_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className='max-w-[40px] md:max-w-[60px] h-[40px] md:h-[45px] text-[18px] border'
            />
          )) : Array.from({ length: 6 }, (_, index) => (
            <Skeleton
              key={index}
              className='w-[40px] max-w-[40px] md:max-w-[60px] h-[40px] md:h-[45px] text-[18px] border'
            />
          ))}
     
        </InputOTPGroup>
      </InputOTP>

      {/* Display OTP or expired message */}
      <span>
        {timeRemaining !== null && timeRemaining > 0
          ? data?.otpCode
          : t("auth.otp_code_expired")}
      </span>

      {/* Verify Button */}
      <Button
        onClick={handleVerify}
        disabled={loading}
        type='submit'
        variant='default'
        className='bg-[#EF7F1A] w-full mt-4'
      >
        {loading ? (
          <div className='flex items-center gap-2'>
            <LoadingSpinner /> {t("auth.verifying")}
          </div>
        ) : (
          t("auth.verify")
        )}
      </Button>

      {/* Resend Button */}
      {(timeRemaining === null || timeRemaining <= 0) && (
        <Button
          type='button'
          variant='ghost'
          className='w-full'
          onClick={handleResend}
        >
          {t("auth.resend")}
        </Button>
      )}
    </form>
  );
};

export default VerifyOtp;
