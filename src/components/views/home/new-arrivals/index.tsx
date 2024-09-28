import React from "react";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { BookI } from "@/types";
import Section from "@/layout/section";
import { ProductCard } from "@/generic";
import Container from "@/layout/container";
import useCategoriesService from "@/services/categories";
import BookSkeleton from "@/components/common/product-card-skeleton";

const NewArrivals: React.FC = () => {
	const { t } = useTranslation();
	const { getNewlyArrivedBooks } = useCategoriesService();
	const { isLoading, isError, data } = getNewlyArrivedBooks;

	const loading = isLoading || isError;

	const renderBooks = () => {
		if (loading) {
			return Array.from({ length: 8 }).map((_, idx) => (
				<CarouselItem
					key={idx}
					className="basis-[50%] sm:basis-[33%] md:basis-[25%] lg:basis-[20%] xl:basis-[16.6%]"
				>
					<BookSkeleton />
				</CarouselItem>
			));
		}

		return data?.books?.map((book: BookI) => (
			<CarouselItem
				key={book._id}
				className="basis-[50%] sm:basis-[33%] md:basis-[25%] lg:basis-[20%] xl:basis-[16.6%]"
			>
				<ProductCard {...book} noSlide />
			</CarouselItem>
		));
	};

	return (
		<Section
			id="new-arrivals"
			className="bg-[#F0F0F0] py-[16px] sm:py-[22px] md:py-[28px]"
		>
			<Container>
				<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[34.13px] text-black">
					{t("home.new_arrivals.title")}
				</h3>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
					className="relative"
				>
					<CarouselContent className="py-4 pl-1">
						{renderBooks()}
					</CarouselContent>

					<div className="absolute -top-5 right-8">
						<CarouselPrevious />
						<CarouselNext className="-right-6" />
					</div>
				</Carousel>
			</Container>
		</Section>
	);
};

export default NewArrivals;
