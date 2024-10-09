import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Section from "@/layout/section";
import Container from "@/layout/container";

import { BookI } from "@/types";
import { Banners, LoadingSkeleton } from "./customs";
import useRecentlyPublishedBooksFeatures from "./features";
import RecentlyPublishedBookCard from "@/generic/recently-published-book-card";

const RecentlyPublishedBooks: React.FC = () => {
	const { t } = useTranslation();
	const { books, loading, recentlyPublishedBooksRef } =
		useRecentlyPublishedBooksFeatures();

	// Generate skeleton or book items based on loading status
	const renderCarouselItems = useMemo(() => {
		if (loading) {
			return Array.from({ length: 8 }, (_, idx) => (
				<LoadingSkeleton key={idx} />
			));
		}
		return books?.map((book: BookI) => (
			<CarouselItem
				key={book._id}
				className="basis-[100%] sm:basis-[80%] md:basis-[60%] lg:basis-[40%] lg:mr-[14px]"
			>
				<RecentlyPublishedBookCard {...book} />
			</CarouselItem>
		));
	}, [books, loading]);

	return (
		<Section
			ref={recentlyPublishedBooksRef}
			data-section="recently-published-books"
			id="newly-published-books"
			className="bg-white py-[30px] md:py-[35px] lg:py-[40px]"
		>
			<Container>
				<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[34.13px] text-black">
					{t("home.newly_published_books.title")}
				</h3>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					plugins={[Autoplay({ delay: 14000, stopOnInteraction: false })]}
					className="relative"
				>
					<CarouselContent className="-ml-4 pt-[15px] sm:pt-[20px] md:pt-[66px] pb-6">
						{renderCarouselItems}
					</CarouselContent>

					<div className="absolute -top-5 right-8">
						<CarouselPrevious />
						<CarouselNext className="-right-6" />
					</div>
				</Carousel>
				<Banners />
			</Container>
		</Section>
	);
};

export default RecentlyPublishedBooks;
