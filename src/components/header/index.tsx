import type { FC } from "react";

import Container from "@/layout/container";
import { HeaderNavigation, TopBar } from "./customs";
import SearchComponent from "../search";

const Header: FC = () => {
	return (
		<header className="pt-[10px] pb-2">
			<Container>
				<TopBar />
				<SearchComponent />
				<HeaderNavigation />
			</Container>
		</header>
	);
};

export default Header;
