import React from "react";

import Container from "@/layout/container";
import Section from "@/layout/section";

import { MockData } from "@/utils";
import { FeaturedCardI } from "@/types";
import FeaturedCard from "./featured-card";

const FeaturedCards: React.FC = () => {
	const { featuredCards }: { featuredCards: FeaturedCardI[] } = MockData(); // Typing featuredCards explicitly

	return (
		<Section id="featured-cards">
			<Container>
				<div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
					{featuredCards.map((item: FeaturedCardI) => (
						<FeaturedCard key={item._id} {...item} />
					))}
				</div>
			</Container>
		</Section>
	);
};

export default FeaturedCards;
