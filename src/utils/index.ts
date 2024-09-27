import { useId } from "react";
import { useTranslation } from "react-i18next";

import { BannerI, FeaturedCardI, StatisticsI } from "@/types";

import bannerImg1 from "@/assets/images/sep-taqdir-tuhfasi.png";
import bannerImg2 from "@/assets/images/onamni-asra.png";
import bannerImg3 from "@/assets/images/haram.png";
import bannerImg4 from "@/assets/images/turkiston.png";
import bannerImg5 from "@/assets/images/hayotga-qayt.png";
import bannerImg6 from "@/assets/images/sivilizatsiyalar-toqnashuvi-va-yangi-dunyo-tartibi.png";

// featuredCards icons
import featuredCardsIcon1 from "@/assets/icons/fast.svg";
import featuredCardsIcon2 from "@/assets/icons/book.svg";
import featuredCardsIcon3 from "@/assets/icons/credit-card.svg";
import featuredCardsIcon4 from "@/assets/icons/guarantee.svg";

import bookIcon from "@/assets/icons/books-icon.svg";

// profile navigation
import { RiDashboardFill } from "react-icons/ri";
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

export const banners: BannerI[] = [
	{
		_id: "1",
		link: import.meta.env.VITE_BASE_URL,
		imgUrl: bannerImg1,
		title: "Sep taqdir tuhfasi",
		position: 1,
		type: 10,
	},
	{
		_id: "2",
		link: import.meta.env.VITE_BASE_URL,
		imgUrl: bannerImg2,
		title: "Onamni asra",
		position: 2,
		type: 10,
	},
	{
		_id: "3",
		link: import.meta.env.VITE_BASE_URL,
		imgUrl: bannerImg3,
		title: "Haram",
		position: 3,
		type: 10,
	},
	{
		_id: "4",
		link: import.meta.env.VITE_BASE_URL,
		imgUrl: bannerImg4,
		title: "Turkiston Rossiya va Xitoy oraligida",
		position: 4,
		type: 10,
	},
	{
		_id: "5",
		link: import.meta.env.VITE_BASE_URL,
		imgUrl: bannerImg5,
		title: "Hayotga qayt",
		position: 5,
		type: 10,
	},
	{
		_id: "6",
		link: import.meta.env.VITE_BASE_URL,
		imgUrl: bannerImg6,
		title: "Sivilizatsiyalar toqnashuvi va yangi dunyo tartibi",
		position: 6,
		type: 10,
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

	const statistics: StatisticsI[] = [
		{
			_id: "1",
			icon: bookIcon,
			title: 5000,
			description: t("home.statistics.description_1"),
		},
		{
			_id: "2",
			icon: bookIcon,
			title: 30000,
			description: t("home.statistics.description_2"),
		},
		{
			_id: "3",
			icon: bookIcon,
			title: 7,
			description: t("home.statistics.description_3"),
		},
	];

	const profileNavigation = [
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
			roles: ["user"],
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
		},
		{
			_id,
			Icon: TbCategory,
			label: t("dashboard.sidebar.categories"),
			path: "/dashboard/categories",
			roles: ["admin", "owner"],
		},
		{
			_id,
			Icon: FaRegNewspaper,
			label: t("dashboard.sidebar.news"),
			path: "/dashboard/news",
			roles: ["admin", "owner"],
		},
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
		},
		{
			label: t("dashboard.books.language_type.en"),
			value: "en",
		},
		{
			label: t("dashboard.books.language_type.ru"),
			value: "ru",
		},
		{
			label: t("dashboard.books.language_type.tr"),
			value: "tr",
		},
	];

	const categories = [
		{ label: t("header.category.books"), path: "/books" },
		{ label: t("header.category.collections"), path: "/packages" },
		{ label: t("header.category.authors"), path: "/authors" },
		{ label: t("header.category.discounts"), path: "/discounts" },
	];

	return {
		categories,
		bookStates,
		statistics,
		bookLanguages,
		featuredCards,
		bookCoverTypes,
		profileNavigation,
		dashboardSidebarNavigation,
	};
};
