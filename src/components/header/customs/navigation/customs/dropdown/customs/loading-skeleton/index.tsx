import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: FC = () => {
	return (
		<>
			{Array.from({ length: 20 }).map((_, index) => (
				<Skeleton key={index} className="w-full h-[35px] bg-[#e5e0e0]" />
			))}
		</>
	);
};

export default LoadingSkeleton;
