import { useId } from "react";
import { useTranslation } from "react-i18next";

import { FeaturedCardI } from "@/types";

// banners 2
import banner2Img1 from "@/assets/images/banner-1.jpg";
import banner2Img2 from "@/assets/images/banner-2.jpg";
import banner2Img3 from "@/assets/images/banner-3.jpg";
import banner2Img4 from "@/assets/images/banner-4.jpg";
import banner2Img5 from "@/assets/images/banner-5.jpg";

// featuredCards icons
import featuredCardsIcon1 from "@/assets/icons/fast.svg";
import featuredCardsIcon2 from "@/assets/icons/book.svg";
import featuredCardsIcon3 from "@/assets/icons/credit-card.svg";
import featuredCardsIcon4 from "@/assets/icons/guarantee.svg";

// profile navigation
import { RiDashboard3Line, RiDashboardFill } from "react-icons/ri";
import { SlBasketLoaded } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";

// dashboard sidebar
import { LuUsers2 } from "react-icons/lu";
import { SlBasket } from "react-icons/sl";
import { TbCategory } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { IoBookSharp } from "react-icons/io5";
import { IoBasketOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa6";
import { PiUsersThreeLight } from "react-icons/pi";

export const banners_2 = [
	{
		_id: "1",
		imgUrl: banner2Img1,
	},
	{
		_id: "2",
		imgUrl: banner2Img2,
	},
	{
		_id: "3",
		imgUrl: banner2Img3,
	},
	{
		_id: "4",
		imgUrl: banner2Img4,
	},
	{
		_id: "5",
		imgUrl: banner2Img5,
	},
];

export const MockData = () => {
	const _id = useId();
	const { t } = useTranslation();

	const featuredCards: FeaturedCardI[] = [
		{
			_id,
			icon: featuredCardsIcon1,
			title: t("home.featured_cards.card_1.title"),
			description: t("home.featured_cards.card_1.description"),
		},
		{
			_id,
			icon: featuredCardsIcon2,
			title: t("home.featured_cards.card_2.title"),
			description: t("home.featured_cards.card_2.description"),
		},
		{
			_id,
			icon: featuredCardsIcon3,
			title: t("home.featured_cards.card_3.title"),
			description: t("home.featured_cards.card_3.description"),
		},
		{
			_id,
			icon: featuredCardsIcon4,
			title: t("home.featured_cards.card_4.title"),
			description: t("home.featured_cards.card_4.description"),
		},
	];

	const profileNavigation = [
		{
			_id,
			icon: RiDashboard3Line,
			label: t("profile.nav.features"),
			path: "/profile",
			roles: ["admin", "owner", "user"],
		},
		{
			_id,
			icon: RiDashboardFill,
			label: t("profile.nav.dashboard"),
			path: "/dashboard",
			roles: ["admin", "owner"],
		},
		{
			_id,
			icon: SlBasketLoaded,
			label: t("profile.nav.orders"),
			path: "/profile/orders",
			roles: ["admin", "owner", "user"],
		},
		{
			_id,
			icon: IoSettingsOutline,
			label: t("profile.nav.settings"),
			path: "/profile/settings",
			roles: ["admin", "owner", "user"],
		},
	];

	const dashboardSidebarNavigation = [
		{
			_id,
			Icon: GrUserAdmin,
			label: t("dashboard.sidebar.admins"),
			path: "/dashboard/admins",
			roles: ["admin", "owner"],
		},

		{
			_id,
			Icon: LuUsers2,
			label: t("dashboard.sidebar.users"),
			path: "/dashboard/users",
			roles: ["admin", "owner"],
		},
		{
			_id,
			Icon: PiUsersThreeLight,
			label: t("dashboard.sidebar.authors"),
			path: "/dashboard/authors",
			roles: ["admin", "owner"],
		},
		{
			_id,
			Icon: IoBookSharp,
			label: t("dashboard.sidebar.genres"),
			path: "/dashboard/genres",
			roles: ["admin", "owner"],
		},
		{
			_id,
			Icon: IoBasketOutline,
			label: t("dashboard.sidebar.products"),
			path: "/dashboard/products",
			roles: ["admin", "owner"],
		},
		{
			_id,
			Icon: SlBasket,
			label: t("dashboard.sidebar.orders"),
			path: "/dashboard/orders",
			roles: ["admin", "owner"],
		}
	];

	const bookStates = [
		{
			label: t("dashboard.books.state_type.new"),
			value: "new",
		},
		{
			label: t("dashboard.books.state_type.old"),
			value: "old",
		},
	];

	const bookCoverTypes = [
		{
			label: t("dashboard.books.cover_type.hard"),
			value: "hard",
		},
		{
			label: t("dashboard.books.cover_type.soft"),
			value: "soft",
		},
		{
			label: t("dashboard.books.cover_type.digital"),
			value: "digital",
		},
	];

	const bookLanguages = [
		{
			label: t("dashboard.books.language_type.uz"),
			value: "uz",
			_id: "uz",
		},
		{
			label: t("dashboard.books.language_type.en"),
			value: "en",
			_id: "en",
		},
		{
			label: t("dashboard.books.language_type.ru"),
			value: "ru",
			_id: "ru",
		},
		// {
		// 	label: t("dashboard.books.language_type.tr"),
		// 	value: "tr",
		// },
	];

	const categories = [
		{ label: t("header.category.books"), path: "/books?page=1&limit=24" },
		{ label: t("header.category.authors"), path: "/authors?page=1&limit=24" },
		{ label: t("header.category.news"), path: "/news?page=1&limit=12" },
	];

	const newsfilterOptions = [
		{
			label: t("news.all"),
			value: "all",
		},
		{
			label: t("news.title"),
			value: "news",
		},
		{
			label: t("news.new_books"),
			value: "newBook",
		}
	];

	const newsTypes = [
		{
			label: "News",
			value: "news",
		},
		{
			label: 'New Book',
			value: 'newBook',
		},
	]

	return {
		newsTypes,
		categories,
		bookStates,
		bookLanguages,
		featuredCards,
		bookCoverTypes,
		newsfilterOptions,
		profileNavigation,
		dashboardSidebarNavigation,
	};
};
