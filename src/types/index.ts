import type { FC } from "react";

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

export interface OrderI {
	_id: string;
	userId: string;
	bookId: string;
	paymentMethodId: string;
	quantity: number;
	deliveryMethodId: string;
	price: number;
	status: "pending" | "processing" | "delivered" | "cancelled";
}

export type RoleT = "user" | "admin" | "owner";

export interface BillingAddressI {
	region: string;
	district: string;
	extraAddress: string;
}

export interface UserI {
	_id: string;
	name: string;
	surname: string;
	phoneNumber: string;
	profilePhoto: string;
	email: string;
	bio: string;
	balance: number;
	frozenBalance: number;
	lastEnteredAt: Date;
	signInAttempts: number;
	role: RoleT;
	orders: any[];
	books: BookI[];
	wishlist: BookI[];
	billingAddress: BillingAddressI;
	createdAt: Date;
	updatedAt: Date;
}

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
	_id: string;
	name: string;
	bookCount: number;
	imgUrl: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface BannerI {
	_id: string;
	title: string;
	imgUrl: string;
	link: string;
}

export interface FeaturedCardI {
	_id?: string;
	icon: any;
	title: string;
	description: string;
}

export interface StatisticsI {
	totalBooks: number;
	totalNamedBooks: number;
	totalBranches: number;
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

export interface NewsI {
	title: string;
	content: string;
	imgUrl: string;
	createdAt: Date;
	updatedAt: Date;
	isRead: number;
	readCount: number;
	type: "news" | "newBook";
	link?: string;
	book?: any;
	_id: string;
}

export interface ReviewI {
	_id: string;
	user: UserI;
	bookId: string;
	message: string;
	rating: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CartItemI extends BookI {
	_id: string;
	name: string;
	amount: number;
	bookPrice: number;
	cover: string;
	discount: number;
	imgUrl: string;
	link: string;
	maxAmount: number;
	state: string;
	author: AuthorI;
}

export interface UserCheckoutInfo {
	name: string;
	surname: string;
	phoneNumber: string;
	delivery_method: string;
	payment_method: string;
	extra_note: string;
	billingAddress: {
		region: string;
		district: string;
		extraAddress: string;
	};
}

export interface DeliveryMethodI {
	_id: string;
	name: string;
	type: "courier" | "pickup" | "postal";
	value: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface PaymentMethodI {
	_id: string;
	name: string;
	type: "payme" | "cash" | "click";
	createdAt?: Date;
	updatedAt?: Date;
}

export interface RegionI {
	_id: string;
	name: string;
	paymentTypes: ("balance" | "card" | "cash")[];
}
