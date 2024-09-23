import React from "react";
import { Logout, Navigation, ProfileImage, UserInfo } from "./customs";

const Sidebar: React.FC = () => {
	return (
		<aside className="p-6 bg-[#F6F6F6] h-fit rounded-lg">
			<ProfileImage />
			<UserInfo />
			<Navigation />
			<Logout />
		</aside>
	);
};

export default Sidebar;
