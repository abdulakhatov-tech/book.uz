import News from "@/components/views/home/news";
import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

const Main: React.FC = () => {
	const hasOutlet = useOutlet();

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
