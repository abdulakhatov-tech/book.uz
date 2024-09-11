import type React from "react";

import Container from "@/layout/container";
import { HeaderNavigation, TopBar } from "./customs";

const Header: React.FC = () => {

	return (
		<header id="header" className="mt-[24px]">
			<Container>
				<TopBar />
				<HeaderNavigation />
			</Container>
		</header>
	);
};

export default Header;
