import type React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import ModalVisibility from "@/components/common/modals";

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
    </div>
  );
};

export default MainLayout;
