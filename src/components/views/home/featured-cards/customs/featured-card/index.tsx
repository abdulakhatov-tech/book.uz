import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FeaturedCardI } from "@/types";

const FeaturedCard: React.FC<FeaturedCardI> = ({
	icon,
	title,
	description,
}) => {
	return (
		<Card className="bg-[rgba(16,125,228,0.1)]">
			<CardHeader>
				<div>
					<img src={icon} alt={`${title} icon`} className="w-[48px] h-[48px]" />
				</div>
			</CardHeader>
			<CardContent>
				<CardTitle className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold leading-[27px] text-blue mb-2">
					{title}
				</CardTitle>
				<CardDescription className="text-[14px] lg:text-[16px] font-normal leading-[20.8px] text-blue">
					{description}
				</CardDescription>
			</CardContent>
		</Card>
	);
};

export default FeaturedCard;
