import type { FC } from "react";

import Section from "@/layout/section";
import Container from "@/layout/container";

import { MockData } from "@/utils";
import { StatisticsI } from "@/types";
import { Banner, CardItem } from "./customs";

const Statistics: FC = () => {
	const { statistics } = MockData();

	return (
		<Section id="statistics" className="py-[30px] md:py-[35px] lg:py-[40px]">
			<Container>
				<Banner />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px] md:mt-[35px] lg:mt-[40px]">
					{statistics.map((item: StatisticsI) => (
						<CardItem key={item._id} {...item} />
					))}
				</div>
			</Container>
		</Section>
	);
};

export default Statistics;
