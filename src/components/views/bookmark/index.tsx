import { FC } from "react";
import { useTranslation } from "react-i18next";

import { BookI } from "@/types";
import Section from "@/layout/section";
import { ProductCard } from "@/generic";
import Container from "@/layout/container";
import useLoading from "@/utils/custom-loading";
import { useAppSelector } from "@/hooks/useRedux";
import BookSkeleton from "@/components/common/product-card-skeleton";

const SKELETON_COUNT = 12;

const BookMarkComponent: FC = () => {
	const { t } = useTranslation();
	const { isLoading } = useLoading();
	const wishlist = useAppSelector((state) => state.wishlist.bookmark);

	return (
		<Section id="bookmark" className="pt-4 pb-[80px] md:pb-[100px]">
			<Container>
				<h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-[34.13px] text-black mb-4">
					{t("header.favourites")}
				</h3>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:3 md:gap-4">
					{isLoading
						? Array.from({ length: SKELETON_COUNT }, (_, idx) => (
								<BookSkeleton key={idx} />
							))
						: wishlist?.map((book: BookI) => (
								<ProductCard key={book._id} book={book} />
							))}
				</div>
			</Container>
		</Section>
	);
};

export default BookMarkComponent;
