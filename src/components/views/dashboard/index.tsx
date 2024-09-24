import React from "react";
import classNames from "classnames";
import { Header, Sidebar } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isOpen } = useAppSelector((state) => state.sidebar);

	return (
		<>
			<Header />
			<div
				className={classNames("w-full grid transition-all duration-300", {
					"grid-cols-[250px_1fr]": !isOpen,
					"grid-cols-[80px_1fr]": isOpen,
				})}
				style={{ height: "calc(100vh - 60px)" }}
			>
				<Sidebar />
				<div className="p-6 bg-[#F5F5F5]">
					<div
						className="bg-white w-full h-full p-8 overflow-auto"
						style={{ height: "calc(100vh - 70px - 40px)" }}
					>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
