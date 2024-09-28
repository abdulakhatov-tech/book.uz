import { useState, FC, useMemo } from "react";

import { banners_2 } from "@/utils";
import useLoading from "@/utils/custom-loading";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

const Banners: FC = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const { isLoading } = useLoading();

	const handlePaginationClick = (index: number) => {
		if (!isLoading) setActiveIndex(index);
	};

	const renderPaginationDots = useMemo(
		() =>
			banners_2.map((_, index) => (
				<button
					key={index}
					className={`w-2 md:w-3 h-2 md:h-3 rounded-full custom-shadow transition-colors duration-300 ${
						index === activeIndex ? "bg-orange" : "bg-white"
					}`}
					onClick={() => handlePaginationClick(index)}
					aria-label={`Go to slide ${index + 1}`}
				/>
			)),
		[activeIndex, isLoading],
	);

	const renderCarouselContent = useMemo(
		() => (
			<CarouselContent
				className="flex transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${activeIndex * 100}%)` }}
			>
				{banners_2.map(({ _id, imgUrl }) => (
					<CarouselItem key={_id} className="min-w-full max-h-[400px]">
						<img
							src={imgUrl}
							alt="Banner"
							className="h-full w-full object-cover"
							loading="lazy"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
		),
		[activeIndex],
	);

	return (
		<div className="relative mt-[30px] md:mt-[35px] lg:mt-[40px] rounded-[6px] md:rounded-[16px] overflow-hidden custom-shadow">
			{isLoading ? (
				<Skeleton className="bg-skeleton-color min-w-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] max-h-[400px]" />
			) : (
				<Carousel>{renderCarouselContent}</Carousel>
			)}

			<div className="flex justify-center gap-1 md:gap-2 mt-4 absolute bottom-4 left-1/2 transform -translate-x-1/2">
				{renderPaginationDots}
			</div>
		</div>
	);
};

export default Banners;
