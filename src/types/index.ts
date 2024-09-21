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
	childCount: number;
	ebookCount: number;
	imgUrl?: string | null;
	name: string;
	parentId: string | null;
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
	bio?: string;           // Object ID
  }