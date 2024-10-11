import type { RoutePropT } from "@/types";
import { lazy, useId } from "react";

const Home = lazy(() => import("@/pages/home"));
const Books = lazy(() => import("@/pages/books"));
const BookDetails = lazy(() => import("@/pages/books/book-details"));
const Authors = lazy(() => import("@/pages/authors"));
const AuthorDetails = lazy(() => import("@/pages/authors/details"));
const Cart = lazy(() => import("@/pages/cart"));
const Checkout = lazy(() => import("@/pages/cart/checkout"));
const Bookmark = lazy(() => import("@/pages/bookmark"));
const News = lazy(() => import("@/pages/news"));
const Profile = lazy(() => import("@/pages/profile"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Orders = lazy(() => import("@/pages/profile/orders"));
const Settings = lazy(() => import("@/pages/profile/settings"));
const CheckoutSuccess = lazy(
	() => import("@/pages/cart/checkout/checkout-success"),
);

const Admins = lazy(() => import("@/pages/dashboard/admins"));
const Users = lazy(() => import("@/pages/dashboard/users"));
const DashboarBooks = lazy(() => import("@/pages/dashboard/books"));
const OrdersPage = lazy(() => import("@/pages/dashboard/orders"));
const Genres = lazy(() => import("@/pages/dashboard/genres"));
const AuthorsPage = lazy(() => import("@/pages/dashboard/authors"));
const CreateAuthorPage = lazy(() => import("@/pages/dashboard/authors/create"));
const EditAuthorPage = lazy(() => import("@/pages/dashboard/authors/edit"));
const CreateGenrePage = lazy(() => import("@/pages/dashboard/genres/create"));
const EditGenrePage = lazy(() => import("@/pages/dashboard/genres/edit"));
const CreateBookPage = lazy(() => import("@/pages/dashboard/books/create"));
const EditBookPage = lazy(() => import("@/pages/dashboard/books/edit"));
const NewsDetailsPage = lazy(() => import("@/pages/news/details"));

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
			path: "/authors",
			Component: Authors,
			isPrivate: false,
			children: [
				{
					_id: _id(),
					path: "details/:authorId",
					Component: AuthorDetails,
					isPrivate: false,
				},
			],
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
			isPrivate: true,
			children: [
				{
					_id: _id(),
					path: ":newsId",
					Component: NewsDetailsPage,
					isPrivate: true,
				},
			],
		},
		{
			_id: _id(),
			path: "/profile",
			Component: Profile,
			isPrivate: true,
			children: [
				{
					_id: _id(),
					path: "orders",
					Component: Orders,
					isPrivate: true,
				},
				{
					_id: _id(),
					path: "settings",
					Component: Settings,
					isPrivate: true,
				},
			],
		},
		{
			_id: _id(),
			path: "/checkout-success",
			Component: CheckoutSuccess,
			isPrivate: true,
		},
	];

	const dashboardRoutes: RoutePropT[] = [
		{
			_id: _id(),
			path: "/dashboard",
			Component: Dashboard,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/admins",
			Component: Admins,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/users",
			Component: Users,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/products",
			Component: DashboarBooks,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/products/create",
			Component: CreateBookPage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/products/edit/:bookId",
			Component: EditBookPage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/orders",
			Component: OrdersPage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/authors",
			Component: AuthorsPage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/authors/create",
			Component: CreateAuthorPage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/authors/edit/:authorId",
			Component: EditAuthorPage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/genres",
			Component: Genres,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/genres/create",
			Component: CreateGenrePage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
		{
			_id: _id(),
			path: "/dashboard/genres/edit/:genreId",
			Component: EditGenrePage,
			isPrivate: true,
			allowedRoles: ["admin", "owner"],
		},
	];

	return { appRoutes, dashboardRoutes };
};

export default useAppRoutes;
