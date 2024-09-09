import React, { useEffect } from "react";

import { MenuModalVisibility } from "./customs";
import useMediaQuery from "@/hooks/useMediaQuery";
import { toggleMenuModalVisibility } from "@/redux/slices/modals";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

const ModalVisibility: React.FC = () => {
  const dispatch = useAppDispatch();
  const { menuModalVisibility } = useAppSelector((state) => state.modal);

  // Media query to check if the screen width is less than 767px
  const lg = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    dispatch(toggleMenuModalVisibility(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg])

  return <>{menuModalVisibility && <MenuModalVisibility />}</>;
};

export default ModalVisibility;
