import React from "react";
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
import BookSkeleton from "@/components/common/product-card-skeleton";
import useOnlineStatus from "@/hooks/useOnlineStatus";

interface ProductsCarouselPropsI {
	title: string;
	booksRef?: React.RefObject<HTMLElement>;
	books: any;
	className?: string;
}

const ProductsCarousel: React.FC<ProductsCarouselPropsI> = ({
	title,
	booksRef,
	books,
	className,
}) => {
	const isOnline = useOnlineStatus();
	const { isLoading, isError, data } = books;
	console.log(data, "carousel");

	const loading = isLoading || isError || !isOnline;

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

		if (Array.isArray(data)) {
			return data?.map((book: BookI) => (
				<CarouselItem
					key={book._id}
					className="basis-[50%] sm:basis-[33%] md:basis-[25%] lg:basis-[20%] xl:basis-[16.6%]"
				>
					<ProductCard {...book} noSlide />
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
			ref={booksRef}
			data-section="new-arrivals"
			id="new-arrivals"
			className={
				className
					? className
					: "bg-[#F0F0F0] py-[30px] md:py-[35px] lg:py-[40px]"
			}
		>
			<Container>
				<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[34.13px] text-black">
					{title}
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

export default ProductsCarousel;
