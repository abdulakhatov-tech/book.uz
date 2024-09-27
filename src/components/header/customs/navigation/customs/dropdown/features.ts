import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useGenresService from "@/services/genres";
import useOnlineStatus from "@/hooks/useOnlineStatus";

import { toggleCategoryDropdownVisibility } from "@/redux/slices/modals";

const CategoryDropdownFeatures = () => {
	const dispatch = useAppDispatch();
	const isOnline = useOnlineStatus();
	const { genres } = useGenresService();
	const { categoryDropdownVisibility } = useAppSelector((state) => state.modal);

	const { isLoading, isError, data: genresData } = genres;
	const loading = !isOnline || isLoading || isError;

	// Disable scrolling on body when popover is open
	useEffect(() => {
		if (categoryDropdownVisibility) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		// Cleanup to reset the scroll behavior when component unmounts or popover closes
		return () => {
			document.body.style.overflow = "";
		};
	}, [categoryDropdownVisibility]);

	const handleClose = () => dispatch(toggleCategoryDropdownVisibility(false));

	return {
		loading,
		genresData,
		handleClose,
		categoryDropdownVisibility,
	};
};

export default CategoryDropdownFeatures;
