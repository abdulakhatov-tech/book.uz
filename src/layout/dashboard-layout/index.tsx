import Dashboard from "@/components/views/dashboard";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return <Dashboard>
    <Outlet />
  </Dashboard>;
};

export default DashboardLayout;
