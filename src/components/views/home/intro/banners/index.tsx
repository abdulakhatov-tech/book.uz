import React from "react";
import { NavLink } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { BannerI } from "@/types";
import { banners } from "@/utils";
import { formatTitleToUrl } from "@/helpers";

const Banners: React.FC = () => {
	if (!banners.length) return null;

	return (
		<div className="h-fit flex-grow bg-[#d2b8be] rounded-[8px]">
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				plugins={[
					Autoplay({
						delay: 3000,
					}),
				]}
				className="relative"
			>
				<CarouselContent>
					{banners.map(({ _id, title, imgUrl, link }: BannerI) => (
						<CarouselItem key={_id} className="w-full">
							<NavLink to={`${link}/books/details/${formatTitleToUrl(title)}`}>
								<img
									src={imgUrl}
									alt={`Banner for ${title}`}
									loading="lazy"
									className="w-full h-full rounded-[8px] object-cover"
								/>
							</NavLink>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393]" />
				<CarouselNext className="absolute right-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393]" />
			</Carousel>
		</div>
	);
};

export default Banners;
