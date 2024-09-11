import type { RoutePropT } from "@/types";
import { lazy, useId } from "react";

const Home = lazy(() => import("@/pages/home"));
const Books = lazy(() => import("@/pages/books"));
const BookDetails = lazy(() => import("@/pages/books/book-details"));
const Packages = lazy(() => import("@/pages/packages"));
const Authors = lazy(() => import("@/pages/authors"));
const Discounts = lazy(() => import("@/pages/discounts"));
const Cart = lazy(() => import("@/pages/cart"));
const Checkout = lazy(() => import("@/pages/cart/checkout"));
const Bookmark = lazy(() => import("@/pages/bookmark"));
const News = lazy(() => import("@/pages/news"));
const Profile = lazy(() => import("@/pages/profile"));
const Dashboard = lazy(() => import("@/pages/dashboard"));

const useAppRoutes = () => {
	const _id = useId;

	const appRoutes: RoutePropT[] = [
		{
			_id: _id(),
			path: "/",
			Component: Home,
			isPrivate: false,
		},
		{
			_id: _id(),
			path: "/books",
			Component: Books,
			isPrivate: false,
			children: [
				{
					_id: _id(),
					path: "details/:slug",
					Component: BookDetails,

					isPrivate: false,
				},
			],
		},
		{
			_id: _id(),
			path: "/packages",
			Component: Packages,
			isPrivate: false,
		},
		{
			_id: _id(),
			path: "/authors",
			Component: Authors,
			isPrivate: false,
		},
		{
			_id: _id(),
			path: "/discounts",
			Component: Discounts,
			isPrivate: false,
		},
		{
			_id: _id(),
			path: "/cart",
			Component: Cart,
			isPrivate: false,
			children: [
				{
					_id: _id(),
					path: "checkout",
					Component: Checkout,

					isPrivate: true,
				},
			],
		},
		{
			_id: _id(),
			path: "/bookmark",
			Component: Bookmark,
			isPrivate: false,
		},
		{
			_id: _id(),
			path: "/news",
			Component: News,
			isPrivate: false,
		},
		{
			_id: _id(),
			path: "/profile",
			Component: Profile,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard",
			Component: Dashboard,
			isPrivate: true,
		},
	];

	return { appRoutes };
};

export default useAppRoutes;
