import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: FC = () => {
	return Array.from({ length: 4 }).map((_, idx) => (
		<Skeleton key={idx} className="h-[200px] bg-skeleton-color" />
	));
};

export default LoadingSkeleton;
