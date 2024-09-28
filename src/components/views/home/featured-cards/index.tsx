import type { FC } from "react";

import { MockData } from "@/utils";
import Section from "@/layout/section";
import { FeaturedCardI } from "@/types";
import Container from "@/layout/container";
import { FeaturedCard, LoadingSkeleton } from "./customs";
import useLoading from "@/utils/custom-loading";

const FeaturedCards: FC = () => {
	const { featuredCards } = MockData();
	const { isLoading } = useLoading();

	return (
		<Section
			id="featured-cards"
			className="bg-white pt-3 md:pt-5 mb-8 md:pb-10"
		>
			<Container>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
					{isLoading ? (
						<LoadingSkeleton />
					) : (
						featuredCards.map((item: FeaturedCardI) => (
							<FeaturedCard key={item._id} {...item} />
						))
					)}
				</div>
			</Container>
		</Section>
	);
};

export default FeaturedCards;
