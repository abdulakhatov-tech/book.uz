import ModalVisibility from "@/components/common/modals";
import Header from "@/components/header";
import type React from "react";

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			Layout
			<ModalVisibility />
		</>
	);
};

export default MainLayout;
