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
import dashboardIcon from '@/assets/icons/dashboard.svg';
import orderIcon from '@/assets/icons/order.svg';
import settings from '@/assets/icons/settings.svg';

import { RiDashboardFill } from "react-icons/ri";
import { SlBasketLoaded } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";

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
			roles: ["admin", "owner"]
		},
		{
			_id,
            icon: SlBasketLoaded ,
            label: t("profile.nav.orders"),
            path: "/profile/orders",
			roles: ['user']
		},
		{
			_id,
            icon: IoSettingsOutline,
            label: t("profile.nav.settings"),
            path: "/profile/settings",
			roles: ["admin", "owner", "user"]
		}
	]

	return { featuredCards, statistics, profileNavigation };
};
