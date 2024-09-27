import { KeyboardEvent, useCallback } from "react";

import { useAppDispatch } from "@/hooks/useRedux";
import { toggleMenuModalVisibility } from "@/redux/slices/modals";

const useTopBarFeatures = () => {
	const dispatch = useAppDispatch();

	const handleMenuClick = useCallback(() => {
		dispatch(toggleMenuModalVisibility(true));
	}, [dispatch]);

	const handleOnKeyDown = useCallback(
		(event: KeyboardEvent<HTMLImageElement>) => {
			if (event.key === "Enter" || event.key === " ") {
				handleMenuClick();
			}
		},
		[handleMenuClick],
	);
	return { handleMenuClick, handleOnKeyDown };
};

export default useTopBarFeatures;
