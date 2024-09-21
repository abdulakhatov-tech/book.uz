import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

const Main: React.FC = () => {
	const hasOutlet = useOutlet();

	return <>{hasOutlet ? <Outlet /> : <>Main</>}</>;
};

export default Main;
