import type { FC } from "react";

import { Card } from "@/components/ui/card";
import useLoading from "@/utils/custom-loading";
import { Skeleton } from "@/components/ui/skeleton";
import { StatisticsI } from "@/types";

const CardItem: FC<StatisticsI> = ({ icon, title, description }) => {
	const { isLoading } = useLoading();

	if (isLoading) {
		return (
			<Skeleton className="bg-skeleton-color w-full h-[120px] sm:h-[150px] md:h-[170px]" />
		);
	}

	return (
		<Card className="py-5 md:py-7 px-4 md:px-6 bg-[rgba(214,89,17,0.1)] flex items-center gap-4 md:gap-6  transition-transform duration-300 ease-in-out transform hover:scale-[1.05] hover:shadow-lg">
			<div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] lg:w-[72px] lg:h-[72px] rounded-[50%] bg-white flex items-center justify-center">
				<img
					src={icon}
					alt={`${title} icon`}
					className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] lg:w-[44px] lg:h-[44px]"
				/>
			</div>
			<div className="max-w-[70%]">
				<h3 className="text-[24px] md:text-[32px] font-semibold">{title}</h3>
				<p className="text-[14px] md:text-[18px] text-gray-600">
					{description}
				</p>
			</div>
		</Card>
	);
};

export default CardItem;
