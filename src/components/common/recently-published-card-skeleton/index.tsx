import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const RecentlyPublishedCardSkeleton: React.FC = () => {
	return (
		<div className="relative">
			<Skeleton className="bg-[#919191] w-[290px] md:w-[350px] lg:w-[480px] h-[200px] md:h-[246px]" />
			<Skeleton className="bg-gray w-[140px] md:w-[180px] h-[200px] md:h-[250px] absolute z-10 -top-[40px] left-[20px]" />
		</div>
	);
};

export default RecentlyPublishedCardSkeleton;
