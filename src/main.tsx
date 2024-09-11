import { createRoot } from "react-dom/client";
import "./index.css";
import AppProvider from "./provider";
import AppRoutes from "./routes";

createRoot(
	document.getElementById("root") ?? document.createElement("div"),
).render(
	<AppProvider>
		<AppRoutes />
	</AppProvider>,
);
