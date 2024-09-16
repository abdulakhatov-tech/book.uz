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
	parentId: string | null
}

export interface BannerI {
	_id?: string;
	title: string;
	imgUrl: string;
	link: string;
	position: number;
	type: number
  }