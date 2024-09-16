import type React from "react";
import { Outlet } from "react-router-dom";

import ModalVisibility from "@/components/common/modals";
import Header from "@/components/header";
import Container from "../container";
import { Toaster } from "@/components/ui/toaster";

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<ModalVisibility />
			<Toaster />
		</>
	);
};

export default MainLayout;
