import type React from "react";
import { Provider } from "react-redux";
import AuthProvider from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";

import { store } from "@/redux/store";
import authStore from "@/config/auth";
import SuspenseWrapper from "@/tools/suspense-wrapper";

interface AppProviderProps {
	children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<AuthProvider store={authStore}>
			<BrowserRouter>
				<SuspenseWrapper>
					<Provider store={store}>{children}</Provider>
				</SuspenseWrapper>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default AppProvider;
