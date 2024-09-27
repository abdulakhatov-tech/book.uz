import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleMenuModalVisibility } from "@/redux/slices/modals";

const useMenuModalVisibilityFeatures = () => {
	const dispatch = useAppDispatch();
	const { menuModalVisibility } = useAppSelector((state) => state.modal);

	const handleCloseSidebar = () => dispatch(toggleMenuModalVisibility(false));
	const handleOnKeyDown = (event: any) => {
		if (event.key === "Enter" || event.key === " ") {
			handleCloseSidebar();
		}
	};

	return { handleCloseSidebar, handleOnKeyDown, menuModalVisibility };
};

export default useMenuModalVisibilityFeatures;
