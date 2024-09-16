import type React from "react";
import { useEffect } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleCategoryDropdownVisibility, toggleMenuModalVisibility } from "@/redux/slices/modals";
import { AuthModalVisibility, MenuModalVisibility } from "./customs";

const ModalVisibility: React.FC = () => {
	const dispatch = useAppDispatch();
	const { menuModalVisibility, authModalVisibility } = useAppSelector(
		(state) => state.modal,
	);

	// Media query to check if the screen width is less than 767px
	const lg = useMediaQuery("(min-width: 1024px)");

	useEffect(() => {
		if (lg) {
			dispatch(toggleMenuModalVisibility(false));
			dispatch(toggleCategoryDropdownVisibility(false))
		}
	}, [lg, dispatch]);

	return (
		<>
			{menuModalVisibility && <MenuModalVisibility />}
			{authModalVisibility.open && <AuthModalVisibility />}
		</>
	);
};

export default ModalVisibility;
