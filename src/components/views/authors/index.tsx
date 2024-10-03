import { FC } from "react";
import { Outlet, useOutlet } from "react-router-dom";

const AuthorsComponent: FC = () => {
	const hasOutlet = useOutlet();

	return <>{!hasOutlet ? <div>AuthorsComponent</div> : <Outlet />}</>;
};

export default AuthorsComponent;
