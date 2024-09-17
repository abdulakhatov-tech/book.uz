import React from "react";
import Section from "@/layout/section";
import Container from "@/layout/container";

import banner from "@/assets/images/banner-download.png";

import { Card } from "@/components/ui/card";
import { MockData } from "@/utils";
import { StatisticsI } from "@/types";

const Statistics: React.FC = () => {
	const { statistics } = MockData();

	return (
		<Section id="statistics" className="py-[40px] md:py-[60px] lg:py-[80px]">
			<Container>
				<div>
					<img
						src={banner}
						alt="Banner for Downloading App"
						className="w-full object-cover"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[40px] md:mt-[60px] lg:mt-[80px]">
					{statistics.map((item: StatisticsI) => (
						<Card
							key={item._id}
							className="py-5 md:py-7 px-4 md:px-6 bg-[rgba(214,89,17,0.1)] flex items-center gap-4 md:gap-6"
						>
							<div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-[50%] bg-white flex items-center justify-center">
								<img
									src={item.icon}
									alt={`${item.title} icon`}
									className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] lg:w-[44px] lg:h-[44px]"
								/>
							</div>
							<div className="max-w-[70%]">
								<h3 className="text-[24px] md:text-[32px] font-semibold">
									{item.title}
								</h3>
								<p className="text-[14px] md:text-[18px] text-gray-600">
									{item.description}
								</p>
							</div>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default Statistics;
