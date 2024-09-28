import React from "react";
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
import { BannerItem } from "./customs";
import useLoading from "@/utils/custom-loading";
import { Skeleton } from "@/components/ui/skeleton";

const autoplayOptions = Autoplay({
	delay: 3000,
});

const carouselOptions = {
	align: "start" as const,
	loop: true,
};

const Banners: React.FC = () => {
	const { isLoading } = useLoading();

	if (!banners?.length) return null;

	return (
		<div className="h-full flex-grow relative rounded-[8px] overflow-hidden">
			{isLoading ? (
				<Skeleton className="h-full w-full max-h-[448px] min-h-[200px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[450px] bg-skeleton-color" />
			) : (
				<Carousel opts={carouselOptions} plugins={[autoplayOptions]}>
					<CarouselContent className="h-full max-h-[448px]">
						{banners.map((item: BannerI) => (
							<BannerItem key={item._id} {...item} />
						))}
					</CarouselContent>
					<CarouselPrevious className="absolute left-2 md:left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393]" />
					<CarouselNext className="absolute right-2 md:right-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393]" />
				</Carousel>
			)}
		</div>
	);
};

export default Banners;
