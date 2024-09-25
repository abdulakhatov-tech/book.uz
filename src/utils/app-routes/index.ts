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
const Orders = lazy(() => import("@/pages/profile/orders"));
const Settings = lazy(() => import("@/pages/profile/settings"));

const Users = lazy(() => import("@/pages/dashboard/users"));
const Products = lazy(() => import("@/pages/dashboard/products"));
const OrdersPage = lazy(() => import("@/pages/dashboard/orders"));
const Genres = lazy(() => import("@/pages/dashboard/genres"));
const AuthorsPage = lazy(() => import("@/pages/dashboard/authors"));
const Categories = lazy(() => import("@/pages/dashboard/categories"));
const NewsPage = lazy(() => import("@/pages/dashboard/news"));
const CreateAuthorPage = lazy(() => import("@/pages/dashboard/authors/create"));
const EditAuthorPage = lazy(() => import("@/pages/dashboard/authors/edit"));
const CreateGenrePage = lazy(() => import("@/pages/dashboard/genres/create"));
const EditGenrePage = lazy(() => import("@/pages/dashboard/genres/edit"));

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
	];

	const dashboardRoutes: RoutePropT[] = [
		{
			_id: _id(),
			path: "/dashboard",
			Component: Dashboard,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/users",
			Component: Users,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/products",
			Component: Products,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/orders",
			Component: OrdersPage,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/authors",
			Component: AuthorsPage,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/authors/create",
			Component: CreateAuthorPage,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/authors/edit/:authorId",
			Component: EditAuthorPage,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/genres",
			Component: Genres,
			isPrivate: true,
		},
		{
			_id: _id(),
            path: "/dashboard/genres/create",
            Component: CreateGenrePage,
            isPrivate: true,
		},
		{
			_id: _id(),
            path: "/dashboard/genres/edit/:genreId",
            Component: EditGenrePage,
            isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/categories",
			Component: Categories,
			isPrivate: true,
		},
		{
			_id: _id(),
			path: "/dashboard/news",
			Component: NewsPage,
			isPrivate: true,
		},
	];

	return { appRoutes, dashboardRoutes };
};

export default useAppRoutes;
