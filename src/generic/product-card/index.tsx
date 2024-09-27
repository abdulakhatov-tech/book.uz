import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { GrSearch } from "react-icons/gr";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { BookI } from "@/types";
import { formatPrice } from "@/helpers";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ProductCard: React.FC<BookI & { noSlide?: boolean }> = ({
	_id,
	name,
	imgUrl,
	author,
	bookPrice,
	additionalImages,
	noSlide,
}) => {
	const { t } = useTranslation();
	const [preloadedImgUrl, setPreloadedImgUrl] = useState<string>(imgUrl);

	const autoplayDelay = 2000;

	useEffect(() => {
		// Preload the fallback image
		const img = new Image();
		img.src = imgUrl;
		img.onload = () => setPreloadedImgUrl(imgUrl); // Fallback image is preloaded
	}, [imgUrl]);

	const renderImages = () => {
		if (additionalImages?.length > 0) {
			return (
				<Carousel
					plugins={
						!noSlide
							? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
							: []
					}
				>
					<CarouselContent>
						{additionalImages.map((item: string, idx: number) => (
							<CarouselItem key={idx}>
								<img
									src={item}
									onError={(e) => {
										// Fallback to imgUrl if item fails to load
										(e.currentTarget as HTMLImageElement).src = preloadedImgUrl;
									}}
									className="w-full h-full object-cover aspect-[2/3] flex items-center justify-center"
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			);
		}

		return (
			<PhotoProvider className="h-full">
				<PhotoView src={imgUrl}>
					<img
						src={imgUrl}
						className="w-full h-full object-cover aspect-[2/3] flex items-center justify-center"
						alt={author.fullName}
					/>
				</PhotoView>
			</PhotoProvider>
		);
	};

	const renderActionButton = (
		icon: React.ReactNode,
		additionalClasses = "",
	) => (
		<div
			className={`w-7 md:w-8 h-7 md:h-8 rounded-full bg-white center custom-shadow hover:bg-orange active:bg-orange ${additionalClasses}`}
		>
			{icon}
		</div>
	);

	return (
		<div className="custom-shadow p-2 rounded-[8px]">
			<div className="relative max-h-[240px] sm:max-h-[245px] w-full overflow-hidden rounded-[6px]">
				{renderImages()}
				<div className="absolute bottom-2 right-2 z-10 flex flex-col gap-1">
					{renderActionButton(
						<IoMdHeartEmpty className="text-[18px] md:text-[20px] text-black hover:text-white" />,
					)}
					{renderActionButton(
						<FaShoppingBasket className="text-[16px] md:text-[18px] text-black hover:text-white" />,
					)}
					{renderActionButton(
						<Link to={`/books/details/${_id}`}>
							<GrSearch className="text-[16px] md:text-[18px] text-black hover:text-white" />
						</Link>,
					)}
				</div>
			</div>
			<div className="py-[10px]">
				<h3 className="text-[16px] md:text-[18px] font-semibold leading-[21.78px] text-black truncate">
					{name}
				</h3>
				<h4 className="text-[12px] md:text-[14px] font-normal leading-[16.94px] text-gray mt-[6px] mb-[8px] truncate">
					{author.fullName}
				</h4>
				<h3 className="text-[16px] md:text-[18px] font-semibold leading-[24.38px] text-orange">
					{formatPrice(bookPrice)} {t("home.new_arrivals.currency")}
				</h3>
			</div>
		</div>
	);
};

export default ProductCard;
