import type { FC } from "react";
import { PiSpinnerBold } from "react-icons/pi";

const LoadingSpinner: FC<{ className?: string }> = ({ className }) => {
  return (
    <PiSpinnerBold
      className={`spin ${className ? className : "text-[20px] md:text-[22px]"}`}
    />
  );
};

export default LoadingSpinner;
