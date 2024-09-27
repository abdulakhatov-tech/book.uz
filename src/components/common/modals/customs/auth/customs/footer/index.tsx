import type { FC } from "react";
import { useTranslation } from "react-i18next";

import useAuthFeatures from "../../features";

const AuthFooter: FC = () => {
  const { t } = useTranslation();
  const { authType, navigateToSignUp, navigateToSignIn } = useAuthFeatures();

  // Determine the text and the onClick action based on authType
  const message =
    authType === "sign-in"
      ? t("auth.not_have_account")
      : t("auth.have_you_registered");

  const actionLabel =
    authType === "sign-in"
      ? t("auth.register_now")
      : t("auth.login");

  const handleClick =
    authType === "sign-in" 
      ? navigateToSignUp
      : navigateToSignIn;

  return (
    <p
      className="text-[14px] md:text-[16px] font-normal leading-[19.36px] text-[#5E5E5E]"
      onClick={handleClick}
    >
      {message}{" "}
      <span className="text-blue">{actionLabel}</span>
    </p>
  );
};

export default AuthFooter;
