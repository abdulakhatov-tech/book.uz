import type React from "react";
import { Outlet } from "react-router-dom";

import ModalVisibility from "@/components/common/modals";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
			<ModalVisibility />
			<Toaster />
		</>
	);
};

export default MainLayout;
