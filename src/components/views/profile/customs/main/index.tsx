import News from "@/components/views/home/news";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useOutlet } from "react-router-dom";

const Main: React.FC = () => {
	const hasOutlet = useOutlet();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === "/profile") {
			navigate("/profile/orders");
		}
	}, [location.pathname]);

	return (
		<>
			{hasOutlet ? (
				<Outlet />
			) : (
				<div>
					<News />
				</div>
			)}
		</>
	);
};

export default Main;
