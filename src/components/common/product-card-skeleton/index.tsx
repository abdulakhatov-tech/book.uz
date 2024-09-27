import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BookSkeleton: React.FC = () => {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton className="h-[200px] md:h-[235px] bg-gray" />
			<div className="flex flex-col gap-1">
				<Skeleton className="w-[90%] h-[16px] bg-gray" />
				<Skeleton className="w-[60%] h-[16px] bg-gray" />
				<Skeleton className="w-[70%] h-[16px] bg-gray" />
			</div>
		</div>
	);
};

export default BookSkeleton;
