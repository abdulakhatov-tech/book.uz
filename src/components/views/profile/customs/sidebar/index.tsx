import React from "react";
import { Logout, Navigation, ProfileImage, UserInfo } from "./customs";

const Sidebar: React.FC = () => {
	return (
		<aside className="px-6 pt-6 pb-1 bg-[#F6F6F6] h-fit rounded-lg custom-shadow">
			<ProfileImage />
			<UserInfo />
			<Navigation />
			<Logout />
		</aside>
	);
};

export default Sidebar;
