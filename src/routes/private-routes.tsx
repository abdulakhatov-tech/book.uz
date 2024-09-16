import { useEffect } from "react";
// import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const dispatch = useAppDispatch();
	//   const { isAuthed } = useAppSelector((state) => state.auth);
	const isAuthed = false;

	useEffect(() => {
		if (!isAuthed) {
			// Dispatch the action to show the authentication modal
			dispatch(toggleAuthModalVisibility({ open: true }));
		}
	}, [isAuthed, dispatch]);

	return isAuthed ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
