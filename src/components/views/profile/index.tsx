import React from "react";

import Container from "@/layout/container";
import { Main, Sidebar } from "./customs";

const Profile: React.FC = () => {
	return (
		<Container>
			<div className="grid grid-cols-1 md:grid-cols-[289px_1fr] gap-[24px] md:gap-[30px] pb-[100px]">
				<Sidebar />
				<Main />
			</div>
		</Container>
	);
};

export default Profile;
