import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { BannerI } from "@/types";
import { BannerItem } from "./customs";
import useBannersService from "@/services/banners";
import { Skeleton } from "@/components/ui/skeleton";
import useOnlineStatus from "@/hooks/useOnlineStatus";

const autoplayOptions = Autoplay({
	delay: 3000,
});

const carouselOptions = {
	align: "start" as const,
	loop: true,
};

const Banners: React.FC = () => {
	const isOnline = useOnlineStatus();
	const { useGetAllBanners } = useBannersService();

	const { isLoading, isError, data: banners} = useGetAllBanners();
	const loading = isLoading || isError || !isOnline

	return (
		<div className="h-full flex-grow relative rounded-[8px] overflow-hidden">
			{loading ? (
				<Skeleton className="h-full w-full max-h-[448px] min-h-[200px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[450px] bg-skeleton-color" />
			) : (
				<Carousel opts={carouselOptions} plugins={[autoplayOptions]}>
					<CarouselContent className="h-full max-h-[448px]">
						{banners.map((item: BannerI) => (
							<BannerItem key={item._id} {...item} />
						))}
					</CarouselContent>
					<CarouselPrevious className="absolute left-2 md:left-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393] bg-white" />
					<CarouselNext className="absolute right-2 md:right-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#939393] bg-white" />
				</Carousel>
			)}
		</div>
	);
};

export default Banners;
