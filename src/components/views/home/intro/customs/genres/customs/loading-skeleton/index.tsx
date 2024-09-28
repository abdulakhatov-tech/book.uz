import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: FC = () =>
	Array.from({ length: 9 }).map((_, index) => (
		<Skeleton key={index} className="p-5 w-full bg-skeleton-color" />
	));

export default LoadingSkeleton;
