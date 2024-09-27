import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import { toggleAuthModalVisibility } from "@/redux/slices/modals";

const useAuthFeatures = () => {
  const dispatch = useAppDispatch();
  const { authModalVisibility } = useAppSelector((state) => state.modal);

  const { open, authType } = authModalVisibility;

  const handleClose = () => {
    dispatch(toggleAuthModalVisibility({ open: false, authType: "sign-in" }));
  };

  const navigateToSignUp = () => {
    dispatch(toggleAuthModalVisibility({ authType: "sign-up" }));
  };

  const navigateToSignIn = () => {
    dispatch(toggleAuthModalVisibility({ authType: "sign-in" }));
  };

  return {
    open, authType, handleClose, navigateToSignUp, navigateToSignIn
  };
};

export default useAuthFeatures;
