import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "@/layout/main-layout";
import type { RenderComponentT } from "@/types";
import useAppRoutes from "@/utils/app-routes";
import PrivateRoute from "./private-routes";

const NotFound = lazy(() => import("@/pages/not-found"));
const Error = lazy(() => import("@/pages/error"));

const AppRoutes = () => {
	const { appRoutes } = useAppRoutes();

	const renderComponent: React.FC<RenderComponentT> = ({
		Component,
		isPrivate,
	}) =>
		isPrivate ? (
			<PrivateRoute>
				<Component />
			</PrivateRoute>
		) : (
			<Component />
		);

	return (
		<Routes>
			<Route element={<MainLayout />}>
				{appRoutes.map(({ _id, path, Component, children, isPrivate }) => {
					if (!children?.length) {
						return (
							<Route
								index
								key={_id as string}
								path={path}
								element={renderComponent({
									Component,
									path,
									isPrivate,
								})}
							/>
						);
					}

					return (
						<Route
							key={_id}
							path={path}
							element={renderComponent({ Component, path, isPrivate })}
						>
							{children?.map(
								({ _id, path, Component, children, isPrivate }) => {
									if (!children?.length) {
										return (
											<Route
												index
												key={_id}
												path={path}
												element={renderComponent({
													Component,
													path,
													isPrivate,
												})}
											/>
										);
									}
								},
							)}
						</Route>
					);
				})}

				<Route path="/not-found" element={<NotFound />} />
				<Route path="/error" element={<Error />} />
				<Route path="*" element={<Navigate to="/not-found" />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
