import { BannerI } from "@/types";

import bannerImg1 from "@/assets/images/sep-taqdir-tuhfasi.png";
import bannerImg2 from "@/assets/images/onamni-asra.png";
import bannerImg3 from "@/assets/images/haram.png";
import bannerImg4 from "@/assets/images/turkiston.png";
import bannerImg5 from "@/assets/images/hayotga-qayt.png";
import bannerImg6 from "@/assets/images/sivilizatsiyalar-toqnashuvi-va-yangi-dunyo-tartibi.png";

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
