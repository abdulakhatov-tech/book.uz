import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

import { useAppDispatch } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useIsAuthenticated()

	useEffect(() => {
		if (!isAuthenticated) {
			// Dispatch the action to show the authentication modal
			dispatch(toggleAuthModalVisibility({ open: true }));
		}
	}, [isAuthenticated, dispatch]);

	return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
