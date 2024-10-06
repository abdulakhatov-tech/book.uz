import type React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import ModalVisibility from "@/components/common/modals";
import ScrollRestoration from "@/tools/scroll-restoration";
import BackToTop from "@/tools/back-to-top";

const MainLayout: React.FC = () => {

	
	return (
		<div className="flex flex-col min-h-[100vh]">
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
			<ModalVisibility />
			<Toaster />
			<ScrollRestoration />
			<BackToTop />
		</div>
	);
};

export default MainLayout;
