import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { BannerI } from "@/types";
import { banners } from "@/utils";
import { BannerItem } from "./customs";

const autoplayOptions = Autoplay({
	delay: 3000,
});

const carouselOptions = {
	align: "start" as const,
	loop: true,
};

const Banners: React.FC = () => {
	if (!banners?.length) return null;

	return (
		<div className="h-full relative">
			<Carousel opts={carouselOptions} plugins={[autoplayOptions]}>
				<CarouselContent className="h-full max-h-[448px]">
					{banners.map((item: BannerI) => (
						<BannerItem key={item._id} {...item} />
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-2 md:left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393]" />
				<CarouselNext className="absolute right-2 md:right-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393]" />
			</Carousel>
		</div>
	);
};

export default Banners;
