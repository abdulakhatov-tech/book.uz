import type React from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/header";
import ModalVisibility from "@/components/common/modals";
import Container from "../container";

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
    </>
  );
};

export default MainLayout;
