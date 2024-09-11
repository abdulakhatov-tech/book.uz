import type React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "@/redux/store";
import SuspenseWrapper from "@/tools/suspense-wrapper";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <SuspenseWrapper>
        <Provider store={store}>{children}</Provider>
      </SuspenseWrapper>
    </BrowserRouter>
  );
};

export default AppProvider;
