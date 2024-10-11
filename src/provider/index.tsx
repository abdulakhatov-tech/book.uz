import type React from "react";
import { Provider } from "react-redux";
import AuthProvider from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-photo-view/dist/react-photo-view.css";
import "rc-slider/assets/index.css";

import { store } from "@/redux/store";
import authStore from "@/config/auth";
import SuspenseWrapper from "@/tools/suspense-wrapper";
import "@/locale";
import { HelmetProvider } from "react-helmet-async";

interface AppProviderProps {
	children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient();

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<AuthProvider store={authStore}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<SuspenseWrapper>
						<Provider store={store}>
							<HelmetProvider>{children}</HelmetProvider>
							{/* <ReactQueryDevtools position="left" initialIsOpen={false} /> */}
						</Provider>
					</SuspenseWrapper>
				</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default AppProvider;
