import { FC, useEffect, useState } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { AuthorI } from "@/types";

interface RenderImagesPropsI {
	imgUrl: string;
	author: AuthorI;
	additionalImages: string[];
	noSlide?: boolean;
}

const RenderImages: FC<RenderImagesPropsI> = ({
	imgUrl,
	author,
	additionalImages,
	noSlide,
}) => {
	const [preloadedImgUrl, setPreloadedImgUrl] = useState<string>(imgUrl);

	const autoplayDelay = 2000;

	useEffect(() => {
		// Preload the fallback image
		const img = new Image();
		img.src = imgUrl;
		img.onload = () => setPreloadedImgUrl(imgUrl); // Fallback image is preloaded
	}, [imgUrl]);

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

export default RenderImages;
