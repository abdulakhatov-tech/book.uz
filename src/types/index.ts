import type { FC } from "react";

export type RenderComponentT = {
	Component: FC<any>;
	path: string;
	meta?: {
		title: string;
		description: string;
	};
	isPrivate?: boolean;
};

export type RoutePropT = {
	_id: string | number;
	path: string;
	Component: FC<any>;
	children?: RoutePropT[];
	isPrivate?: boolean;
};

export interface GenreI {
	_id?: string;
	audioBookCount: number;
	bookCount: number;
	ebookCount: number;
	name: string;
	imgUrl?: string | null;
	childCount?: number;
	parentId?: string | null;
	createdAt?: Date;
}

export interface BannerI {
	_id?: string;
	title: string;
	imgUrl: string;
	link: string;
	position: number;
	type: number;
}

export interface FeaturedCardI {
	_id?: string;
	icon: any;
	title: string;
	description: string;
}

export interface StatisticsI {
	_id: string;
	icon: any;
	title: number;
	description: string;
}

export interface UserI {
	balance: number;
	frozenBalance: number;
	lastEnteredAt: string;
	name: string;
	orders: Array<any>;
	phoneNumber: string;
	products: Array<any>;
	profilePhoto: string;
	role: string;
	signInAttempts: number;
	surname: string;
	wishlist: Array<any>;
	_id: string;
	email?: string;
	bio?: string; // Object ID
}

export interface AuthorI {
	_id: string;
	audioBookCount: number;
	bookCount: number;
	ebookCount: number;
	fullName: string;
	link: string;
	biography: string[];
	dateOfbirth: Date | null;
	dateOfdeath: Date | null;
	imgUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
	__v?: number;
}

export interface BookI {
	_id: string;
	name: string;
	genre: GenreI;
	author: AuthorI;
	amount: number;
	bookPrice: number;
	language: string;
	cover: string;
	discount: number;
	numberOfPage: number;
	state: string;
	year: number;
	barcode: string;
	description: string;
	imgUrl: string;
	additionalImages: string[];
	hasDiscount: boolean;
	link: string;
	rateCount: number;
	rating: number;
	soldBookCount: number;
	createdAt: string;
	updatedAt: string;
}
