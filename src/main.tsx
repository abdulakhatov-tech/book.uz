import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "@/layout";
import AppProvider from "./provider";

createRoot(
	document.getElementById("root") ?? document.createElement("div"),
).render(
	<AppProvider>
		<MainLayout />
	</AppProvider>,
);
