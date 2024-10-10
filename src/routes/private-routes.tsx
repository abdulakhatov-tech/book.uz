import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { UserI } from "@/types";
import { useAppDispatch } from "@/hooks/useRedux";
import { toggleAuthModalVisibility } from "@/redux/slices/modals";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // allowedRoles is now optional
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser<UserI>();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(toggleAuthModalVisibility({ open: true }));
    }
  }, [isAuthenticated, dispatch]);

  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and no roles are specified, allow access
  if (!allowedRoles || !allowedRoles.length) {
    return children;
  }

  // If authenticated but user doesn't have an allowed role, redirect
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children components
  return children;
};

export default PrivateRoute;
